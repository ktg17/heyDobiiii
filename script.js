/* ============================================
   ICE CREAM DATE — Personalized for Dobi 💙
   ============================================ */

const msg         = document.getElementById("message")
const music       = document.getElementById("music")
const bgMusic     = document.getElementById("music")
const musicToggle = document.getElementById("musicToggle")
const cursorTrail = document.getElementById("cursorTrail")

/* === MUSIC === */
let musicPlaying = false
document.body.addEventListener("click", () => {
  if (!musicPlaying) {
    music.volume = 0.5
    music.play().catch(() => {})
    musicPlaying = true
  }
}, { once: true })

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

/* === CURSOR TRAIL === */
document.addEventListener("mousemove", (e) => {
  cursorTrail.style.left = e.clientX + "px"
  cursorTrail.style.top  = e.clientY + "px"
  if (Math.random() > 0.7) spawnCursorHeart(e.clientX, e.clientY)
})

function spawnCursorHeart(x, y) {
  const h = document.createElement("span")
  h.innerHTML = ["💙","✨","💫"][Math.floor(Math.random()*3)]
  h.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    font-size:${10+Math.random()*10}px;
    pointer-events:none; z-index:9997;
    transition:transform 0.8s ease,opacity 0.8s ease;
    transform:translate(-50%,-50%); opacity:0.8;
  `
  document.body.appendChild(h)
  requestAnimationFrame(() => {
    h.style.transform = `translate(${-50+(Math.random()*60-30)}%,${-150+Math.random()*(-50)}%)`
    h.style.opacity = "0"
  })
  setTimeout(() => h.remove(), 900)
}

/* === RIPPLE === */
function addRipple(btn) {
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
}

/* === PARTICLES === */
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
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    r: Math.random()*2+0.5,
    dx: (Math.random()-0.5)*0.4, dy: (Math.random()-0.5)*0.4,
    alpha: Math.random()*0.5+0.2,
    color: Math.random()>0.5 ? "0,210,255" : "167,139,250"
  })
}
function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  particles.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`; ctx.fill()
    p.x+=p.dx; p.y+=p.dy
    if(p.x<0||p.x>canvas.width) p.dx*=-1
    if(p.y<0||p.y>canvas.height) p.dy*=-1
    p.alpha += (Math.random()-0.5)*0.02
    p.alpha = Math.max(0.1, Math.min(0.7, p.alpha))
  })
  requestAnimationFrame(drawParticles)
}
drawParticles()

/* === FLOATING HEARTS === */
let heartInterval = setInterval(() => {
  const heart = document.createElement("span")
  heart.innerHTML = ["💙","💫","✨","🩵","💎"][Math.floor(Math.random()*5)]
  heart.style.cssText = `
    position:absolute; left:${Math.random()*100}vw; bottom:-50px;
    font-size:${Math.random()*20+12}px;
    animation:floatUp ${7+Math.random()*6}s linear forwards;
    pointer-events:none;
  `
  document.querySelector(".bg-hearts").appendChild(heart)
  setTimeout(() => heart.remove(), 13000)
}, 1800)

/* ============================================
   QUIZ — Personalized for Dobi
   ============================================ */
const questions = [
  {
    text:   "Ek rainy evening… Dobi ka mood kaisa hoga? ☔",
    optA:   "Blanket + hot chocolate 🍫",
    optB:   "Chhod yaar, so jaati hoon 😴",
    replyA: "Cozy vibes… main bhi yehi sochta 😌",
    replyB: "Haha sach mein? Chat pe bhi yehi hota hai na 😄"
  },
  {
    text:   "Woh pehli baar DNS pe milna… 🍦",
    optA:   "Acha tha, maza aaya 😊",
    optB:   "DNS best jagah hai tbh 🔥",
    replyA: "Haan na… mujhe bhi yaad hai woh din 💙",
    replyB: "DNS ka shakkar aur tumhari company — dono hi sweet the 😏"
  },
  {
    text:   "Agar hum dono ice-cream khane jaayein toh Dobi ka order? 🍦",
    optA:   "Classic chocolate, hamesha 🍫",
    optB:   "Jo saamne dikhega le lungi 😄",
    replyA: "Predictable… par cute bhi 😄",
    replyB: "Main choose kar lunga toh? 😏"
  },
  {
    text:   "Chat pe baatein karte karte… 💬",
    optA:   "Main jaag ke padh leti hoon 😇",
    optB:   "Sach boluuun? So jaati hoon 😴",
    replyA: "Pakka? 😄 Main maanunga nahi yeh 😏",
    replyB: "Finally sach bol diya… main jaanta tha 😄💙"
  },
  {
    text:   "Koi tumhare liye DNS pe desert order kar ke rakh de… 🍮",
    optA:   "Aww that's so sweet 🥹",
    optB:   "Suspicious… kaun hai ye? 😂",
    replyA: "Chhoti cheezein badi hoti hain na… 💙",
    replyB: "Sochte raho… 😏"
  },
  {
    text:   "Last question, Dobi — kuch connections alag hote hain… 💙",
    optA:   "Haan, feel hota hai 🌙",
    optB:   "Abhi soch rahi hoon 💭",
    replyA: "Yehi toh main kehna chahta tha… 💙",
    replyB: "Le waqt… main hoon yahan 😌"
  }
]

let answers         = []
let currentQuestion = 0
let buttonsLocked   = false
const questionText  = document.getElementById("question")

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
    if (i < index)        dot.className = "dot done"
    else if (i === index) dot.className = "dot active"
    else                  dot.className = "dot"
  })
}

/* === SHOW QUESTION === */
function showQuestion() {
  const q = questions[currentQuestion]

  questionText.classList.remove("question-enter")
  void questionText.offsetWidth
  questionText.innerHTML = q.text
  questionText.classList.add("question-enter")

  const buttonsDiv = document.querySelector(".buttons")
  buttonsDiv.style.display = ""
  buttonsDiv.innerHTML = `
    <button id="optA" class="btn-yes opt-btn">${q.optA}</button>
    <button id="optB" class="btn-no opt-btn">${q.optB}</button>
  `
  addRipple(document.getElementById("optA"))
  addRipple(document.getElementById("optB"))
  document.getElementById("optA").onclick = () => handleAnswer("a")
  document.getElementById("optB").onclick = () => handleAnswer("b")
  updateDots(currentQuestion)
}

function handleAnswer(choice) {
  if (buttonsLocked) return
  buttonsLocked = true
  answers.push(choice)
  const q   = questions[currentQuestion]
  const btn = document.getElementById(choice === "a" ? "optA" : "optB")
  btn.style.transform = "scale(0.9)"
  setTimeout(() => { btn.style.transform = "" }, 200)
  typeReply(choice === "a" ? q.replyA : q.replyB)
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
  const dots = document.getElementById("progressDots")
  if (dots) dots.remove()
  questionText.classList.remove("question-enter","question-exit")
  questionText.innerHTML = "Dobi… I think we vibe 💙"
  questionText.classList.add("question-enter")
  document.querySelector(".buttons").style.display = "none"
  document.querySelector(".hero").style.display    = "none"
  setTimeout(showMiniStory, 1600)
}

/* ============================================
   MINI LOVE STORY — DNS se yahan tak 💙
   ============================================ */
function showMiniStory() {
  const glassInner = document.querySelector(".glass-inner")
  glassInner.innerHTML = `
    <div id="storyBox">
      <div id="storyText"></div>
      <div id="storyCursor">|</div>
    </div>
  `

  const style = document.createElement("style")
  style.textContent = `
    #storyBox {
      padding: 10px;
      text-align: center;
    }
    #storyText {
      font-family: 'Playfair Display', serif;
      font-size: clamp(16px, 3.5vw, 22px);
      line-height: 2;
      color: white;
      text-shadow: 0 0 30px rgba(167,139,250,0.4);
    }
    #storyCursor {
      display: inline-block;
      color: #a78bfa;
      font-size: 22px;
      animation: blink 0.9s step-end infinite;
      margin-top: 8px;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  `
  document.head.appendChild(style)

  const storyLines = [
    "Sab kuch shuru hua ek Instagram DM se… 📩",
    "Chhota sa HI bheja tha — par usne reply kiya.",
    "Aur phir baatein hoti rahi… roz… dheere dheere… 💬",
    "Phir ek din Uska samne se MSg aya — DNS pe icecream khane k liye. 🍦",
    "Socha pehli baar samne dekh ke kya bolunga",
    "Waha usko dekha",
    "Aur pehli nazar mein hi — kuch alag tha usmein.", 
    "MUjhe yaad hai abhi bhi, mene bolne me fumble kiya, aur vo smj nhi payi😄",
    "Menu dekh ke soch mein pad gayi —",
    "\"Yeh loon… nahi woh… hmm… konsa better hai?\"",
    "Yeh sawaal poore 10 minute chala. 😄",
    "Main dekh raha tha.",
    "Aur phir usne choose kiya — aur muskurayi.",
    "Woh chhoti si dimple wali smile… 💙",
    "Main dekhta reh gaya.",
    "Phir ek pal ke liye socha —",
    "ese staring karna achha nahi hota.",
    "Toh maine nazar hata li.",
    "Par woh smile — woh andar kahin ruk gayi. 🌙",
    "Raat ko phir baatein… chat pe khamoshi bhi comfortable thi.",
    "Phir ek taraf se jawab aana band ho gaya…",
    "…Dobi so gayi thi. Phir se. 😴",
    "Par bura nahi laga.",
    "Kyunki kuch log aisi neend laate hain — jahan safe feel ho. 💙",
    "Yeh site…",
    "Yeh woh saari baatein hain jo main kehte kehte ruk gaya.",
    "Ya kabhi keh hi nahi paya. 🌙"
  ]

  let lineIndex = 0
  const storyTextEl = document.getElementById("storyText")
  const storyCursor = document.getElementById("storyCursor")

  function typeLine(line, cb) {
    let i = 0
    const p = document.createElement("p")
    p.style.margin = "4px 0"
    p.style.opacity = "0"
    p.style.transform = "translateY(8px)"
    p.style.transition = "opacity 0.5s, transform 0.5s"
    storyTextEl.appendChild(p)

    requestAnimationFrame(() => {
      p.style.opacity = "1"
      p.style.transform = "translateY(0)"
    })

    function typeChar() {
      if (i < line.length) {
        p.textContent += line.charAt(i)
        i++
        setTimeout(typeChar, 55)
      } else {
        setTimeout(cb, 600)
      }
    }
    typeChar()
  }

  function nextLine() {
    if (lineIndex < storyLines.length) {
      typeLine(storyLines[lineIndex], nextLine)
      lineIndex++
    } else {
      storyCursor.style.display = "none"
      setTimeout(startCinema, 1800)
    }
  }
  nextLine()
}

/* === CINEMA MODE === */
function startCinema() {
  const cinema  = document.getElementById("cinema")
  const textBox = document.getElementById("emotionalText")
  const bouquet = document.getElementById("bouquet")
  const cursor  = document.getElementById("cursor")

  clearInterval(heartInterval)
  cinema.classList.remove("hidden")
  requestAnimationFrame(() => cinema.classList.add("show"))

  const text = `Dobi…\n\nTumse ek baat kehni thi.\n\nWo baat jo main roz sochta hoon,\npar words kabhi sahi nahi aate…\n\nTum jab paas hoti ho —\nkuch ajeeb sa hota hai.\nDil kuch kehna chahta hai,\npar zubaan ruk jaati hai.\n\nYe jo khamoshi hai na mere paas…\nismein bohot kuch chhupta hai.\n\nMain introvert hoon —\nlekin tum woh hoti ho jiske liye\nmain dhoondne ki koshish karta hoon\nsahi words…\n\nIs baar dhundh liye. 💙`

  let i = 0
  function type() {
    if (i < text.length) {
      textBox.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i)
      i++
      setTimeout(type, 65)
    } else {
      setTimeout(() => { cursor.style.display = "none" }, 500)
      setTimeout(() => {
        bouquet.classList.add("show")
        bgMusic.volume = 0.3
        setTimeout(() => {
          bgMusic.volume = 0.5
          cinema.classList.remove("show")
          setTimeout(showDateQuestion, 1200)
        }, 4000)
      }, 2000)
    }
  }
  type()
}

/* === DATE QUESTION === */
function showDateQuestion() {
  heartInterval = setInterval(() => {
    const heart = document.createElement("span")
    heart.innerHTML = ["💙","💫","✨","🩵"][Math.floor(Math.random()*4)]
    heart.style.cssText = `
      position:absolute; left:${Math.random()*100}vw; bottom:-50px;
      font-size:${Math.random()*20+12}px;
      animation:floatUp ${7+Math.random()*6}s linear forwards;
      pointer-events:none;
    `
    document.querySelector(".bg-hearts").appendChild(heart)
    setTimeout(() => heart.remove(), 13000)
  }, 1800)

  const glassInner = document.querySelector(".glass-inner")
  glassInner.innerHTML = `
    <h1 style="background:linear-gradient(135deg,#fff 40%,#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
      Dobi… DNS pe chalogi ek baar aur? 🍦
    </h1>
    <img src="couple.gif" class="hero fadeInUp">
    <div class="buttons fadeInUp delay1" id="dateBtns">
      <button id="yesFinal" class="btn-yes">Haan 💙</button>
      <button id="noFinal"  class="btn-no">Nahi 🙈</button>
    </div>
    <p id="message"></p>
  `
  addRipple(document.getElementById("yesFinal"))
  addRipple(document.getElementById("noFinal"))
  dateLogic()
}

/* === FINAL DATE LOGIC === */
function dateLogic() {
  let noClicks = 0
  let triedNo  = false
  let noScale  = 1.0
  let yesScale = 1.0

  const yesFinal = document.getElementById("yesFinal")
  const noFinal  = document.getElementById("noFinal")

  yesFinal.onclick = () => {
    if (!triedNo) {
      const freshMsg = document.getElementById("message")
      typeReply2(freshMsg, "Pehle NO pe click karo… ek surprise hai 😄")
      return
    }
    showFinalPage()
  }

  noFinal.onclick = () => {
    triedNo = true
    noClicks++

    noScale  = Math.max(0.40, noScale  - 0.18)
    yesScale = Math.min(1.60, yesScale + 0.15)

    noFinal.style.transition  = "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)"
    yesFinal.style.transition = "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)"
    noFinal.style.transform   = `scale(${noScale})`
    yesFinal.style.transform  = `scale(${yesScale})`

    const lines = [
      "Sach mein? Ice-cream bhi hoga DNS pe 🍦",
      "Dobi… please? Main share bhi kar lunga 🥺",
      "Last chance… aur main tumhari favourite flavour order kar dunga 😌",
      "Okay okay… 😢"
    ]
    const freshMsg = document.getElementById("message")
    typeReply2(freshMsg, lines[Math.min(noClicks - 1, 3)])

    if (noClicks === 4) {
      noFinal.style.position = "relative"
      if (!document.getElementById("cryEmoji")) {
        const cry = document.createElement("span")
        cry.id = "cryEmoji"
        cry.innerHTML = "😢"
        cry.style.cssText = `
          position:absolute; top:-24px; left:50%;
          transform:translateX(-50%);
          font-size:22px; pointer-events:none;
          animation:cryBounce 0.5s ease infinite alternate;
        `
        noFinal.appendChild(cry)
      }
      if (!document.getElementById("cryStyle")) {
        const s = document.createElement("style")
        s.id = "cryStyle"
        s.textContent = `
          @keyframes cryBounce {
            from { transform:translateX(-50%) translateY(0); }
            to   { transform:translateX(-50%) translateY(-7px); }
          }
        `
        document.head.appendChild(s)
      }
    }

    if (noClicks >= 5) {
      moveNoButton()
      noFinal.onmouseover  = moveNoButton
      noFinal.ontouchstart = moveNoButton
    }
  }

  function moveNoButton() {
    const yesRect = yesFinal.getBoundingClientRect()
    const cx = yesRect.left + yesRect.width  / 2
    const cy = yesRect.top  + yesRect.height / 2
    const angle  = Math.random() * 2 * Math.PI
    const radius = 120 + Math.random() * 100
    let nx = cx + Math.cos(angle) * radius - noFinal.offsetWidth  / 2
    let ny = cy + Math.sin(angle) * radius - noFinal.offsetHeight / 2
    const pad = 8
    nx = Math.max(pad, Math.min(window.innerWidth  - noFinal.offsetWidth  - pad, nx))
    ny = Math.max(pad, Math.min(window.innerHeight - noFinal.offsetHeight - pad, ny))
    noFinal.style.position   = "fixed"
    noFinal.style.transition = "left 0.3s cubic-bezier(0.34,1.56,0.64,1), top 0.3s cubic-bezier(0.34,1.56,0.64,1)"
    noFinal.style.left       = nx + "px"
    noFinal.style.top        = ny + "px"
    noFinal.style.zIndex     = "200"
    noFinal.style.visibility = "visible"
    noFinal.style.opacity    = "1"
  }
}

/* === FINAL PAGE === */
function showFinalPage() {
  clearInterval(heartInterval)
  document.body.classList.add("night")

  document.querySelector(".glass-inner").innerHTML = `
    <h1 class="dateText">So it's a date, Dobi 💙</h1>
    <div class="loveMeter"><div class="loveFill"></div></div>
    <img src="icecream.png" width="180" class="ice fadeInUp">
    <img src="couple.gif" width="200" class="fadeInUp delay1">
    <p style="margin-top:16px;font-style:italic;color:rgba(255,255,255,0.8)">
      DNS pe milte hain… ice-cream tumhari favourite, baatein meri taraf se 🍦💙
    </p>
    <div class="date-timer">
      <p class="timer-text">Jab tu haan bolegi,<br>tab decide karenge kab milna hai 🍦</p>
    </div>
    <div class="stars"></div>
  `

  // Timer styles
  const s = document.createElement("style")
  s.textContent = `
    .date-timer {
      margin-top: 24px;
      padding: 16px 24px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }
    .timer-text {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: rgba(255,255,255,0.75);
      line-height: 1.8;
      font-style: italic;
    }
  `
  document.head.appendChild(s)

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
    const size = Math.random()*8+6
    piece.style.cssText = `
      left:${Math.random()*100}vw; width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>0.5?"50%":"2px"};
      animation-duration:${2+Math.random()*2}s;
      animation-delay:${Math.random()*0.5}s;
      transform:rotate(${Math.random()*360}deg);
    `
    document.body.appendChild(piece)
    setTimeout(() => piece.remove(), 5000)
  }
}

/* === TYPE REPLY === */
function typeReply(text) {
  msg.innerHTML = ""
  let i = 0
  function type() {
    if (i < text.length) { msg.innerHTML += text.charAt(i); i++; setTimeout(type, 55) }
  }
  type()
}

function typeReply2(el, text) {
  el.textContent = ""
  let i = 0
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i)
      i++
      setTimeout(type, 55)
    }
  }
  type()
}

/* === INIT === */
createProgressDots()
showQuestion()
