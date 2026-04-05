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
    transition:transform 0.8s ease, opacity 0.8s ease;
    transform:translate(-50%,-50%); opacity:0.8;
  `
  document.body.appendChild(h)
  requestAnimationFrame(() => {
    h.style.transform = `translate(${-50+(Math.random()*60-30)}%, ${-150+Math.random()*(-50)}%)`
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
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`
    ctx.fill()
    p.x += p.dx; p.y += p.dy
    if(p.x<0||p.x>canvas.width)  p.dx*=-1
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

/* === QUIZ DATA === */
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
    replyB: "DNS ka meetha aur tumhari company — dono hi sweet the 😏"
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
    text:   "Koi tumhare liye DNS pe ice-cream order kar ke rakh de… 🍦",
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
  buttonsDiv.style.display = "flex"
  buttonsDiv.innerHTML = `
    <button id="optA" class="btn-yes">${q.optA}</button>
    <button id="optB" class="btn-no">${q.optB}</button>
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

/* === MINI LOVE STORY === */
function showMiniStory() {
  const glassInner = document.querySelector(".glass-inner")
  glassInner.innerHTML = `
    <div id="storyBox">
      <div id="storyText"></div>
      <div id="storyCursor">|</div>
    </div>
  `

  const storyLines = [
    { text: "Sab kuch shuru hua ek Instagram DM se… 📩",           pause: 1800 },
    { text: "Chhota sa hi bheja tha — par usne reply kiya.",        pause: 1800 },
    { text: "Aur phir baatein hoti rahi… roz… dheere dheere… 💬",  pause: 2000 },
    { text: "Phir ek din uska message aaya —",                      pause: 1200 },
    { text: "DNS pe ice-cream khane chaloge? 🍦",                   pause: 2200 },
    { text: "Socha… pehli baar samne dekh ke kya bolunga.",         pause: 2000 },
    { text: "Wahan pahuncha.",                                       pause: 1400 },
    { text: "Usne dekha. Aur main ruk gaya ek pal.",                pause: 2000 },
    { text: "Pehla impression?",                                     pause: 1400 },
    { text: "Yeh ladki — kuch alag hai.",                           pause: 2000 },
    { text: "Aankhon mein ek warmth thi jo aksar nahi milti.",      pause: 2200 },
    { text: "Aur ek chhoti si shyness — jo cute thi, honestly. 😊", pause: 2200 },
    { text: "Mujhe yaad hai — bolne mein fumble kiya maine,",       pause: 1800 },
    { text: "aur woh samajh nahi payi. 😄",                         pause: 1800 },
    { text: "Phir dono hanse — aur awkwardness pighal gayi.",       pause: 2000 },
    { text: "Menu dekh ke soch mein pad gayi —",                    pause: 1400 },
    { text: '\"Yeh loon… nahi woh… hmm… konsa better hai?\"',    pause: 2000 },
    { text: "Yeh sawaal poore 10 minute chala. 😄",                 pause: 2200 },
    { text: "Main dekh raha tha.",                                   pause: 1600 },
    { text: "Aur phir usne choose kiya — aur muskurayi.",           pause: 2000 },
    { text: "Woh chhoti si dimple wali smile… 💙",                  pause: 2500 },
    { text: "Main dekhta reh gaya ek pal.",                         pause: 1800 },
    { text: "Phir socha — ese staring karna achha nahi hota.",      pause: 2000 },
    { text: "Toh maine nazar hata li.",                             pause: 2000 },
    { text: "Par woh smile — woh andar kahin ruk gayi. 🌙",        pause: 2500 },
    { text: "Raat ko phir baatein… khamoshi bhi comfortable thi.",  pause: 2000 },
    { text: "Phir ek taraf se jawab aana band ho gaya…",            pause: 1800 },
    { text: "…Dobi so gayi thi. Phir se. 😴",                      pause: 2200 },
    { text: "Par bura nahi laga.",                                   pause: 1600 },
    { text: "Kyunki kuch log aisi neend laate hain —",              pause: 1400 },
    { text: "jahan safe feel ho. 💙",                               pause: 2500 },
    { text: "Yeh site…",                                            pause: 1800 },
    { text: "Yeh woh saari baatein hain jo main kehte kehte ruk gaya.", pause: 2200 },
    { text: "Ya kabhi keh hi nahi paya. 🌙",                       pause: 4000 }
  ]

  let lineIndex = 0
  const storyTextEl = document.getElementById("storyText")
  const storyCursor = document.getElementById("storyCursor")

  function typeLine(lineObj, cb) {
    const line  = lineObj.text
    const pause = lineObj.pause
    let i = 0
    const p = document.createElement("p")
    p.style.cssText = "margin:6px 0; opacity:0; transform:translateY(8px); transition:opacity 0.5s, transform 0.5s;"
    storyTextEl.appendChild(p)
    requestAnimationFrame(() => {
      p.style.opacity = "1"
      p.style.transform = "translateY(0)"
    })
    function typeChar() {
      if (i < line.length) {
        p.textContent += line.charAt(i)
        i++
        storyTextEl.scrollTop = storyTextEl.scrollHeight
        setTimeout(typeChar, 72)   // 72ms per char — readable speed
      } else {
        setTimeout(cb, pause)      // custom pause after each line
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
      setTimeout(startCinema, 5000)  // 5 sec pause at end — reader can finish
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

  // Show cinema
  cinema.classList.add("show")

  const text = [
    "Dobi…",
    "",
    "Tumse ek baat kehni thi.",
    "",
    "Wo baat jo main roz sochta hoon,",
    "par words kabhi sahi nahi aate…",
    "",
    "Tum jab paas hoti ho —",
    "kuch ajeeb sa hota hai.",
    "Dil kuch kehna chahta hai,",
    "par zubaan ruk jaati hai.",
    "",
    "Ye jo khamoshi hai na mere paas…",
    "ismein bohot kuch chhupta hai.",
    "",
    "Main introvert hoon —",
    "lekin tum woh hoti ho jiske liye",
    "main dhoondne ki koshish karta hoon",
    "sahi words…",
    "",
    "Is baar dhundh liye. 💙"
  ]

  let lineIdx = 0

  function typeNextLine() {
    if (lineIdx >= text.length) {
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
      return
    }

    const line = text[lineIdx]
    lineIdx++

    if (line === "") {
      textBox.innerHTML += "<br>"
      setTimeout(typeNextLine, 700)
      return
    }

    let i = 0
    function typeChar() {
      if (i < line.length) {
        textBox.innerHTML += line.charAt(i)
        i++
        setTimeout(typeChar, 80)
      } else {
        textBox.innerHTML += "<br>"
        setTimeout(typeNextLine, 1200)
      }
    }
    typeChar()
  }

  typeNextLine()
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
    <h1 style="background:linear-gradient(135deg,#fff 40%,#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
      Dobi… DNS pe chalogi ek baar aur? 🍦
    </h1>
    <img src="couple.gif" class="hero fadeInUp">
    <div class="buttons fadeInUp delay1">
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
      typeReply2(document.getElementById("message"), "Pehle Nahi pe click karo… ek surprise hai 😄")
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
      "Last chance… tumhari favourite flavour main order kar dunga 😌",
      "Okay okay… 😢"
    ]
    typeReply2(document.getElementById("message"), lines[Math.min(noClicks - 1, 3)])

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
        const s = document.createElement("style")
        s.textContent = `@keyframes cryBounce {
          from { transform:translateX(-50%) translateY(0); }
          to   { transform:translateX(-50%) translateY(-7px); }
        }`
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
    noFinal.style.left = nx + "px"
    noFinal.style.top  = ny + "px"
    noFinal.style.zIndex = "200"
  }
}

/* === PETAL FALL === */
function startPetalFall() {
  const petals = ["🌸","🌷","✿","❀","🌺"]
  const petalInterval = setInterval(() => {
    const p = document.createElement("span")
    p.innerHTML = petals[Math.floor(Math.random()*petals.length)]
    const size = Math.random()*18+10
    const duration = Math.random()*6+5
    const drift = (Math.random()-0.5)*200
    p.style.cssText = `
      position:fixed; top:-30px;
      left:${Math.random()*100}vw;
      font-size:${size}px;
      pointer-events:none;
      z-index:999;
      opacity:0.85;
      animation:petalDrift ${duration}s linear forwards;
      --drift:${drift}px;
    `
    document.body.appendChild(p)
    setTimeout(() => p.remove(), duration*1000)
  }, 400)

  // Add petal animation CSS
  if (!document.getElementById("petalStyle")) {
    const s = document.createElement("style")
    s.id = "petalStyle"
    s.textContent = `
      @keyframes petalDrift {
        0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity:0.9; }
        50%  { transform: translateY(50vh) translateX(var(--drift)) rotate(180deg); opacity:0.7; }
        100% { transform: translateY(110vh) translateX(calc(var(--drift)*1.5)) rotate(360deg); opacity:0; }
      }
    `
    document.head.appendChild(s)
  }

  return petalInterval
}

/* === HEARTBEAT SCREEN === */
function heartbeatEffect() {
  const flash = document.createElement("div")
  flash.style.cssText = `
    position:fixed; inset:0; z-index:9990;
    background: radial-gradient(circle at center, rgba(255,100,150,0.25), transparent 70%);
    pointer-events:none; opacity:0;
    transition: opacity 0.15s ease;
  `
  document.body.appendChild(flash)

  // Two pulses like a real heartbeat — lub dub
  setTimeout(() => { flash.style.opacity = "1" }, 0)
  setTimeout(() => { flash.style.opacity = "0" }, 150)
  setTimeout(() => { flash.style.opacity = "0.7" }, 300)
  setTimeout(() => { flash.style.opacity = "0" }, 500)
  setTimeout(() => flash.remove(), 700)
}

/* === DEAR DOBI LETTER === */
function showDearDobiLetter(container) {
  const letterLines = [
    "Dear Dobi,",
    "",
    "Dekh — mane mari life ma koi regret nathi jooiyo.",
    "Ke tyaan ek 1% chance hato…",
    "ane hu aa chance mate gayo j nahi.",
    "Toh aa letter — e 1% chhe. 💙",
    "",
    "Newton e gravity tyaare discover kari,",
    "jyaare ek din bas ek ped niche bethho hato.",
    "Hu pan ek din DNS ma bethho hato.",
    "Koi plan na hato.",
    "Pan kuch discover jaroor thayu. 🍦",
    "",
    "In 6-7 months —",
    "tara sathe vaat karvi aa mara din no",
    "favorite part bani gayu chhe.",
    "Taro reply avvo, taru vaat karta karta soi javu 😴 —",
    "badhuj genuinely saras lagey chhe.",
    "",
    "Ane honestly?",
    "Mane tane chidavvu bau gamey chhe. 😄",
    "Pele reaction — woh irritation mixed with smile —",
    "I genuinely look forward to that.",
    "",
    "Tari bak bak sambhalvi pan.",
    "Jyaare tu koi vaat par excited thay jaay chhe,",
    "ane words tara thi faster thay jaay —",
    "mane aa bau gamey chhe.",
    "Don't ever stop that. Seriously.",
    "",
    "Peli DNS wali sanj —",
    "10 minute nu menu confusion,",
    "peli dimple wali smile jyaare finally choose karyu,",
    "ane hu jo nazar hatavi lu chhu —",
    "pan jo feel thay chhe e jaati nathi.",
    "",
    "Log kahe chhe ke feelings time sathe",
    "ochi thay jaay chhe.",
    "Mara sathe ultu thayu.",
    "",
    "Toh hu direct aavu chhu —",
    "kyaak aa feelings sirf dosti nathi.",
    "Aa kuch alag chhe.",
    "Aur bahot time thi chhe.",
    "",
    "Joh tara dil ma pan",
    "kyaarek 0.5% pan aavu aavyu hoy —",
    "DNS par malivaa.",
    "Ice-cream mara taraf thi. 🍦",
    "",
    "Ane joh nahi pan aavyu hoy —",
    "toh pan DNS par malivaa. 😄",
    "Because tari company —",
    "worth it chhe. Always.",
    "",
    "Mujhe tum pasand ho, Dobi.",
    "There — maine keh diya. 💙",
    "",
    "— Pelo chokro,",
    "je nazar hatavi le chhe,",
    "tane chidave chhe,",
    "tari bak bak sambhalvu chhe,",
    "pan aa badhuj kehva ma ruki jaato hato.",
    "",
    "Hu atayre aa kru chhu. 💙"
  ]

  // Replace entire page with letter — fullscreen scrollable
  const letterPage = document.createElement("div")
  letterPage.id = "letterPage"
  letterPage.style.cssText = `
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #0a0a1a, #0f2027, #1a0533);
    z-index: 9000;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 24px 80px;
    opacity: 0;
    transition: opacity 1s ease;
    scrollbar-width: none;
  `
  letterPage.style.cssText += "-ms-overflow-style: none;"
  document.body.appendChild(letterPage)

  // Hide scrollbar webkit
  const scrollStyle = document.createElement("style")
  scrollStyle.textContent = `#letterPage::-webkit-scrollbar { display: none; }`
  document.head.appendChild(scrollStyle)

  // Fade in
  requestAnimationFrame(() => {
    setTimeout(() => { letterPage.style.opacity = "1" }, 50)
  })

  // Title
  const title = document.createElement("div")
  title.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 5vw, 32px);
    color: white;
    margin-bottom: 32px;
    text-align: center;
    background: linear-gradient(135deg, #fff 40%, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: dateTextGlow 2s ease-in-out infinite alternate;
  `
  title.textContent = "Ek letter… 💙"
  letterPage.appendChild(title)

  // Letter box
  const letterBox = document.createElement("div")
  letterBox.id = "letterBox"
  letterBox.style.cssText = `
    max-width: 520px;
    width: 100%;
    padding: 32px 28px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,180,200,0.2);
    border-radius: 24px;
    backdrop-filter: blur(10px);
    text-align: left;
    position: relative;
  `
  letterPage.appendChild(letterBox)

  const letterText = document.createElement("div")
  letterText.id = "letterText"
  letterText.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: clamp(14px, 3vw, 17px);
    line-height: 2.1;
    color: rgba(255,255,255,0.90);
  `
  letterBox.appendChild(letterText)

  // Type letter lines one by one
  let idx = 0
  function typeLetterLine() {
    if (idx >= letterLines.length) return
    const line = letterLines[idx]
    idx++

    if (line === "") {
      letterText.appendChild(document.createElement("br"))
      setTimeout(typeLetterLine, 500)
      return
    }

    const span = document.createElement("span")
    span.style.cssText = "display:block; opacity:0; transform:translateY(6px); transition:opacity 0.6s, transform 0.6s;"
    letterText.appendChild(span)

    // Auto scroll to bottom as text appears
    setTimeout(() => {
      span.style.opacity = "1"
      span.style.transform = "translateY(0)"
      letterPage.scrollTop = letterPage.scrollHeight
    }, 50)

    let i = 0
    function typeChar() {
      if (i < line.length) {
        span.textContent += line.charAt(i)
        i++
        letterPage.scrollTop = letterPage.scrollHeight
        setTimeout(typeChar, 52)
      } else {
        setTimeout(typeLetterLine, 950)
      }
    }
    typeChar()
  }

  setTimeout(typeLetterLine, 800)

  // AirDraw button — letter khatam hone ke baad aata hai
  setTimeout(() => {
    const airBtn = document.createElement("button")
    airBtn.id = "airDrawBtn"
    airBtn.innerHTML = "✋ Hawa mein draw karo!"
    airBtn.style.cssText = `
      display: block;
      margin: 28px auto 0;
      padding: 14px 32px;
      background: linear-gradient(135deg, #a78bfa, #ff6eb4);
      border: none;
      border-radius: 50px;
      color: white;
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(167,139,250,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      animation: fadeUp 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards;
      opacity: 0;
    `
    airBtn.onmouseover = () => {
      airBtn.style.transform = "scale(1.05) translateY(-2px)"
      airBtn.style.boxShadow = "0 8px 30px rgba(167,139,250,0.6)"
    }
    airBtn.onmouseout = () => {
      airBtn.style.transform = ""
      airBtn.style.boxShadow = "0 4px 20px rgba(167,139,250,0.4)"
    }
    airBtn.onclick = () => {
      if (typeof initAirDraw === "function") {
        initAirDraw()
      } else {
        console.error("AirDraw not loaded")
      }
    }
    letterPage.appendChild(airBtn)
  }, (letterLines.length * 1200) + 2000)
}

/* === FINAL PAGE === */
function showFinalPage() {
  clearInterval(heartInterval)
  document.body.classList.add("night")

  // Heartbeat on Yes click
  heartbeatEffect()

  const glassInner = document.querySelector(".glass-inner")
  glassInner.innerHTML = `
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

  // Start petal fall
  startPetalFall()

  // Confetti
  setTimeout(launchConfetti, 400)
  setTimeout(launchConfetti, 900)
  setTimeout(launchConfetti, 1400)

  // Dear Dobi letter appears after confetti settles
  setTimeout(() => {
    showDearDobiLetter(glassInner)
  }, 2500)
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
    if (i < text.length) { el.textContent += text.charAt(i); i++; setTimeout(type, 55) }
  }
  type()
}

/* === INIT === */
createProgressDots()
showQuestion()
