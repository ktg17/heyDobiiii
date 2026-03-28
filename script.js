/* ============================================
   ICE CREAM DATE — UPGRADED SCRIPT
   New: Cursor trail, particles, ripple buttons,
   question transitions, progress dots, confetti,
   music toggle, voice fallback
   ============================================ */

/* === ELEMENTS === */
const yesBtn      = document.getElementById("yesBtn")
const noBtn       = document.getElementById("noBtn")
const msg         = document.getElementById("message")
const music       = document.getElementById("music")
const bgMusic     = document.getElementById("music")
const musicToggle = document.getElementById("musicToggle")
const cursorTrail = document.getElementById("cursorTrail")

/* === MUSIC AUTOPLAY ON FIRST CLICK === */
let musicPlaying = false

document.body.addEventListener("click", () => {
  if (!musicPlaying) {
    music.volume = 0.5
    music.play().catch(() => {})
    musicPlaying = true
  }
}, { once: true })

/* Music Toggle */
musicToggle.addEventListener("click", (e) => {
  e.stopPropagation()
  if (music.paused) {
    music.play()
    musicToggle.classList.remove("muted")
    musicToggle.textContent = "🎵"
  } else {
    music.pause()
    musicToggle.classList.add("muted")
    musicToggle.textContent = "🔇"
  }
})

/* === CUSTOM CURSOR TRAIL === */
let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  cursorTrail.style.left = mouseX + "px"
  cursorTrail.style.top  = mouseY + "px"

  // Spawn tiny heart trail occasionally
  if (Math.random() > 0.7) spawnCursorHeart(mouseX, mouseY)
})

function spawnCursorHeart(x, y) {
  const h = document.createElement("span")
  h.innerHTML = ["💙","✨","💫"][Math.floor(Math.random()*3)]
  h.style.cssText = `
    position:fixed;
    left:${x}px;
    top:${y}px;
    font-size:${10 + Math.random()*10}px;
    pointer-events:none;
    z-index:9997;
    transition: transform 0.8s ease, opacity 0.8s ease;
    transform: translate(-50%,-50%);
    opacity:0.8;
  `
  document.body.appendChild(h)
  requestAnimationFrame(() => {
    h.style.transform = `translate(${-50 + (Math.random()*60-30)}%, ${-150 + Math.random()*(-50)}%)`
    h.style.opacity = "0"
  })
  setTimeout(() => h.remove(), 900)
}

/* === RIPPLE EFFECT ON BUTTONS === */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = (e.clientX - rect.left - size/2) + "px"
    ripple.style.top  = (e.clientY - rect.top  - size/2) + "px"
    this.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  })
})

/* === PARTICLE SYSTEM (background sparkles) === */
const canvas = document.getElementById("particleCanvas")
const ctx    = canvas.getContext("2d")

canvas.width  = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
})

const particles = []

for (let i = 0; i < 60; i++) {
  particles.push({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 2 + 0.5,
    dx:    (Math.random() - 0.5) * 0.4,
    dy:    (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2,
    color: Math.random() > 0.5 ? "0,210,255" : "167,139,250"
  })
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`
    ctx.fill()
    p.x += p.dx
    p.y += p.dy
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1
    // Twinkle
    p.alpha += (Math.random() - 0.5) * 0.02
    p.alpha = Math.max(0.1, Math.min(0.7, p.alpha))
  })
  requestAnimationFrame(drawParticles)
}
drawParticles()

/* === FLOATING HEARTS BACKGROUND === */
let heartInterval = setInterval(() => {
  const heart = document.createElement("span")
  const emojis = ["💙","💫","✨","🩵","💎"]
  heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
  heart.style.cssText = `
    position:absolute;
    left:${Math.random()*100}vw;
    bottom:-50px;
    font-size:${Math.random()*20+12}px;
    animation: floatUp ${7 + Math.random()*6}s linear forwards;
    pointer-events:none;
  `
  document.querySelector(".bg-hearts").appendChild(heart)
  setTimeout(() => heart.remove(), 13000)
}, 1800)

/* === QUIZ DATA === */
const questions = [
  "Do you like ice-cream? 🍦",
  "Do you enjoy peaceful walks? 🌇",
  "Do you smile when you're happy? 😊",
  "Do you like spending time with someone special? 💙",
  "Would you like a little surprise today? 🎁"
]

const replies = [
  { yes: "Ice-cream lover 😄 perfect start!",            no: "Ohh... I'll change your mind someday 😏" },
  { yes: "Peaceful walks + you = perfect combo 🌇",      no: "No walks? okay... we'll just sit together 😊" },
  { yes: "That smile is my favorite already 😊",         no: "I'll try to make you smile then 😌" },
  { yes: "Someone special huh… interesting 💙",          no: "Maybe I can become that someone 😏" },
  { yes: "Good… surprises are my thing 🎁",              no: "Still… I might surprise you anyway 😄" }
]

let answers        = []
let currentQuestion = 0
let buttonsLocked  = false

const questionText = document.getElementById("question")

/* === PROGRESS DOTS === */
function createProgressDots() {
  const glassInner = document.querySelector(".glass-inner")
  const dotsEl = document.createElement("div")
  dotsEl.className = "progress-dots"
  dotsEl.id = "progressDots"
  questions.forEach((_, i) => {
    const dot = document.createElement("div")
    dot.className = "dot" + (i === 0 ? " active" : "")
    dot.id = `dot-${i}`
    dotsEl.appendChild(dot)
  })
  glassInner.appendChild(dotsEl)
}

function updateDots(index) {
  questions.forEach((_, i) => {
    const dot = document.getElementById(`dot-${i}`)
    if (!dot) return
    if (i < index)      { dot.className = "dot done" }
    else if (i === index){ dot.className = "dot active" }
    else                 { dot.className = "dot" }
  })
}

function showQuestion() {
  questionText.classList.remove("question-enter")
  void questionText.offsetWidth // reflow
  questionText.innerHTML = questions[currentQuestion]
  questionText.classList.add("question-enter")
  updateDots(currentQuestion)
}

/* === BUTTON HANDLERS === */
yesBtn.onclick = () => handleAnswer("yes")
noBtn.onclick  = () => handleAnswer("no")

function handleAnswer(answer) {
  if (buttonsLocked) return
  buttonsLocked = true

  answers.push(answer)

  // Button bounce
  const btn = answer === "yes" ? yesBtn : noBtn
  btn.style.transform = "scale(0.9)"
  setTimeout(() => { btn.style.transform = "" }, 200)

  typeReply(replies[currentQuestion][answer])

  // Question exit animation
  questionText.classList.add("question-exit")

  setTimeout(() => {
    questionText.classList.remove("question-exit")
    msg.innerHTML = ""
    nextQuestion()
    buttonsLocked = false
  }, 3000)
}

function nextQuestion() {
  currentQuestion++
  if (currentQuestion < questions.length) {
    showQuestion()
  } else {
    showResult()
  }
}

/* === RESULT === */
function showResult() {
  const yesCount = answers.filter(a => a === "yes").length

  // Remove dots
  const dots = document.getElementById("progressDots")
  if (dots) dots.remove()

  questionText.classList.remove("question-enter", "question-exit")
  questionText.innerHTML = yesCount >= 3
    ? "Looks like you enjoy sweet moments 💙"
    : "Hmm... maybe I can still change your mind 😌"

  questionText.classList.add("question-enter")

  document.querySelector(".buttons").style.display = "none"
  document.querySelector(".hero").style.display    = "none"

  setTimeout(startCinema, 1600)
}

/* === CINEMA MODE === */
function startCinema() {
  const cinema  = document.getElementById("cinema")
  const textBox = document.getElementById("emotionalText")
  const bouquet = document.getElementById("bouquet")
  const voice   = document.getElementById("voice")
  const cursor  = document.getElementById("cursor")

  // Clear heartInterval for cinema
  clearInterval(heartInterval)

  cinema.classList.remove("hidden")
  requestAnimationFrame(() => cinema.classList.add("show"))

  const text = `Sach bolu…\n\nMujhe tumse bahut si baatein karni hoti hai…\n\nPar pata nahi kyun…\nJab tum saamne hoti ho…\nSab kuch blank ho jata hai…\n\nMain introvert hoon na…\nIsliye "kuch nahi" bol deta hoon…\n\nPar sach mein…\nbohot kuch hota hai kehne ko… 💙`

  let i = 0

  function type() {
    if (i < text.length) {
      const char = text.charAt(i)
      if (char === "\n") {
        textBox.innerHTML += "<br>"
      } else {
        textBox.innerHTML += char
      }
      i++
      setTimeout(type, 65)
    } else {
      // Hide cursor after typing
      setTimeout(() => { cursor.style.display = "none" }, 500)

      setTimeout(() => {
        setTimeout(() => {
          bouquet.classList.add("show")
          bgMusic.volume = 0.1

          // Try voice, fallback gracefully
          voice.play().catch(() => {
            // No voice.mp3? Just skip to date question after delay
            setTimeout(() => {
              bgMusic.volume = 0.5
              cinema.classList.remove("show")
              setTimeout(() => showDateQuestion(), 1200)
            }, 3000)
          })

          voice.onended = () => {
            bgMusic.volume = 0.5
            cinema.classList.remove("show")
            setTimeout(() => showDateQuestion(), 1200)
          }
        }, 2000)
      }, 500)
    }
  }

  type()
}

/* === DATE QUESTION === */
function showDateQuestion() {
  // Restart hearts
  heartInterval = setInterval(() => {
    const heart = document.createElement("span")
    heart.innerHTML = ["💙","💫","✨","🩵"][Math.floor(Math.random()*4)]
    heart.style.cssText = `
      position:absolute;
      left:${Math.random()*100}vw;
      bottom:-50px;
      font-size:${Math.random()*20+12}px;
      animation: floatUp ${7+Math.random()*6}s linear forwards;
      pointer-events:none;
    `
    document.querySelector(".bg-hearts").appendChild(heart)
    setTimeout(() => heart.remove(), 13000)
  }, 1800)

  const container = document.querySelector(".container")
  container.style.animation = "none"
  container.querySelector(".glass-inner").innerHTML = `
    <h1 style="animation:none;background:linear-gradient(135deg,#fff 40%,#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
      Will you go on an ice-cream date with me? 🍦
    </h1>
    <img src="couple.gif" class="hero fadeInUp">
    <div class="buttons fadeInUp delay1">
      <button id="yesFinal" class="btn-yes">Yes 💙</button>
      <button id="noFinal"  class="btn-no">No 🙈</button>
    </div>
    <p id="message"></p>
  `

  // Re-apply ripple to new buttons
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function(e) {
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = (e.clientX - rect.left - size/2) + "px"
      ripple.style.top  = (e.clientY - rect.top  - size/2) + "px"
      this.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    })
  })

  dateLogic()
}

/* === FINAL DATE LOGIC === */
function dateLogic() {
  let noClicks = 0
  let triedNo  = false

  const yesFinal = document.getElementById("yesFinal")
  const noFinal  = document.getElementById("noFinal")
  const msgEl    = document.getElementById("message")

  yesFinal.onclick = () => {
    if (!triedNo) {
      typeReply2(msgEl, "Wait 😄 try clicking NO first… there is a surprise.")
      return
    }
    showFinalPage()
  }

  noFinal.onclick = () => {
    triedNo = true
    noClicks++

    const lines = [
      "Are you sure? There will be ice-cream 🍦",
      "Think again… best ice-cream date ever 😌",
      "Last chance… I might share my ice-cream.",
      "Okay okay you can't say NO 😝"
    ]

    typeReply2(msgEl, lines[Math.min(noClicks - 1, 3)])

    if (noClicks >= 4) {
      noFinal.addEventListener("mouseover", moveNoButton)
      noFinal.addEventListener("touchstart", moveNoButton, { passive: true })
    }
  }

  function moveNoButton() {
    const margin = 10
    const maxX = window.innerWidth  - noFinal.offsetWidth  - margin
    const maxY = window.innerHeight - noFinal.offsetHeight - margin

    noFinal.style.position   = "fixed"
    noFinal.style.transition = "0.25s cubic-bezier(0.34,1.56,0.64,1)"
    noFinal.style.left = Math.max(margin, Math.random() * maxX) + "px"
    noFinal.style.top  = Math.max(margin, Math.random() * maxY) + "px"
    noFinal.style.zIndex = "50"
  }
}

/* === FINAL PAGE === */
function showFinalPage() {
  clearInterval(heartInterval)

  document.body.classList.add("night")

  document.querySelector(".glass-inner").innerHTML = `
    <h1 class="dateText">So it's a date 💙</h1>
    <div class="loveMeter"><div class="loveFill"></div></div>
    <img src="icecream.png" width="180" class="ice fadeInUp">
    <img src="couple.gif" width="200" class="fadeInUp delay1">
    <p style="margin-top:16px;font-style:italic;color:rgba(255,255,255,0.8)">
      Ice-cream 🍦, peaceful walk and your shy smile 😊
    </p>
    <div class="stars"></div>
  `

  // 🎊 Confetti burst!
  setTimeout(launchConfetti, 400)
  setTimeout(launchConfetti, 900)
  setTimeout(launchConfetti, 1400)
}

/* === CONFETTI === */
function launchConfetti() {
  const colors = ["#00d2ff","#a78bfa","#ff6eb4","#ffd700","#fff","#3a7bd5"]
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div")
    piece.classList.add("confetti-piece")

    const size = Math.random() * 8 + 6
    piece.style.cssText = `
      left: ${Math.random()*100}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      animation-duration: ${2 + Math.random()*2}s;
      animation-delay: ${Math.random()*0.5}s;
      transform: rotate(${Math.random()*360}deg);
    `
    document.body.appendChild(piece)
    setTimeout(() => piece.remove(), 5000)
  }
}

/* === TYPE REPLY (quiz) === */
function typeReply(text) {
  msg.innerHTML = ""
  let i = 0
  function type() {
    if (i < text.length) {
      msg.innerHTML += text.charAt(i)
      i++
      setTimeout(type, 55)
    }
  }
  type()
}

/* === TYPE REPLY (date page) === */
function typeReply2(el, text) {
  el.innerHTML = ""
  let i = 0
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i)
      i++
      setTimeout(type, 55)
    }
  }
  type()
}

/* === INIT === */
createProgressDots()
showQuestion()
