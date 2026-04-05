/* ============================================
   AIRDRAW — Browser-based Air Drawing
   MediaPipe Hands JS + Canvas Drawing
   Heart shape detect karo toh special animation!
   ============================================ */

function initAirDraw() {

  /* === FULLSCREEN PAGE === */
  const airPage = document.createElement("div")
  airPage.id = "airDrawPage"
  airPage.style.cssText = `
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #0a0a1a, #0f2027, #1a0533);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 24px 16px;
    opacity: 0;
    transition: opacity 0.8s ease;
    overflow: hidden;
  `
  document.body.appendChild(airPage)
  setTimeout(() => { airPage.style.opacity = "1" }, 50)

  /* === TITLE === */
  const title = document.createElement("div")
  title.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 4vw, 26px);
    color: white;
    text-align: center;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #fff 40%, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `
  title.innerHTML = "Hawa mein draw karo, Dobi ✨<br><small style='font-size:13px;opacity:0.6;-webkit-text-fill-color:rgba(255,255,255,0.6);'>Index finger uthao — draw shuru! ❤️ draw karo kuch special hoga 😄</small>"
  airPage.appendChild(title)

  /* === STATUS === */
  const status = document.createElement("div")
  status.id = "airStatus"
  status.style.cssText = `
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 8px;
    text-align: center;
  `
  status.textContent = "Camera load ho rahi hai… 🎥"
  airPage.appendChild(status)

  /* === WRAPPER === */
  const wrapper = document.createElement("div")
  wrapper.style.cssText = `
    position: relative;
    width: min(480px, 95vw);
    aspect-ratio: 4/3;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 0 40px rgba(167,139,250,0.2);
  `
  airPage.appendChild(wrapper)

  /* VIDEO */
  const video = document.createElement("video")
  video.id = "airVideo"
  video.autoplay = true
  video.playsInline = true
  video.muted = true
  video.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    opacity: 0.3;
  `
  wrapper.appendChild(video)

  /* DRAWING CANVAS */
  const drawCanvas = document.createElement("canvas")
  drawCanvas.id = "airCanvas"
  drawCanvas.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
  `
  wrapper.appendChild(drawCanvas)

  /* === BUTTONS === */
  const btnRow = document.createElement("div")
  btnRow.style.cssText = "display:flex; gap:12px; margin-top:16px; flex-wrap:wrap; justify-content:center;"
  airPage.appendChild(btnRow)

  const colors = ["#00d2ff","#a78bfa","#ff6eb4","#ffd700","#fff"]
  let currentColor = "#ff6eb4"

  colors.forEach(c => {
    const dot = document.createElement("div")
    dot.style.cssText = `
      width: 28px; height: 28px;
      border-radius: 50%;
      background: ${c};
      cursor: pointer;
      border: 2px solid ${c === currentColor ? "white" : "transparent"};
      transition: transform 0.2s, border 0.2s;
      box-shadow: 0 0 10px ${c}88;
    `
    dot.onclick = () => {
      currentColor = c
      document.querySelectorAll("#airDrawPage .color-dot").forEach(d => d.style.border = "2px solid transparent")
      dot.style.border = "2px solid white"
    }
    dot.classList.add("color-dot")
    btnRow.appendChild(dot)
  })

  const clearBtn = document.createElement("button")
  clearBtn.textContent = "🗑️ Clear"
  clearBtn.style.cssText = `
    padding: 8px 20px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50px;
    background: rgba(255,255,255,0.08);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
  `
  clearBtn.onclick = () => {
    const ctx = drawCanvas.getContext("2d")
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
    heartDetected = false
  }
  btnRow.appendChild(clearBtn)

  const closeBtn = document.createElement("button")
  closeBtn.textContent = "✕ Close"
  closeBtn.style.cssText = `
    padding: 8px 20px;
    border: 1px solid rgba(255,100,100,0.3);
    border-radius: 50px;
    background: rgba(255,50,50,0.1);
    color: rgba(255,150,150,0.9);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
  `
  closeBtn.onclick = () => {
    stopCamera()
    airPage.style.opacity = "0"
    setTimeout(() => airPage.remove(), 800)
  }
  btnRow.appendChild(closeBtn)

  /* === LOAD MEDIAPIPE === */
  let hands = null
  let cameraStream = null
  let lastX = null, lastY = null
  let heartDetected = false
  let drawPoints = []
  let isDrawing = false

  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop())
    }
  }

  /* Dynamically load MediaPipe scripts */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement("script")
      s.src = src
      s.crossOrigin = "anonymous"
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
  }

  async function setupMediaPipe() {
    try {
      status.textContent = "MediaPipe load ho rahi hai… ⏳"

      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js")
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js")
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js")

      status.textContent = "Hand model load ho raha hai… 🤖"

      hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      })

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.6
      })

      hands.onResults(onHandResults)

      /* Start camera */
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 360, facingMode: "user" }
      })
      cameraStream = stream
      video.srcObject = stream

      video.onloadedmetadata = () => {
        drawCanvas.width  = video.videoWidth  || 480
        drawCanvas.height = video.videoHeight || 360
        video.play()
        status.textContent = "Index finger uthao aur draw karo! ✍️"
        processLoop()
      }

    } catch (err) {
      console.error(err)
      status.textContent = "Camera access nahi mila 😕 — browser settings check karo"
    }
  }

  /* === PROCESS LOOP === */
  async function processLoop() {
    if (!hands || !video || video.readyState < 2) {
      requestAnimationFrame(processLoop)
      return
    }
    await hands.send({ image: video })
    requestAnimationFrame(processLoop)
  }

  /* === HAND RESULTS === */
  function onHandResults(results) {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      lastX = null; lastY = null
      isDrawing = false
      return
    }

    const landmarks = results.multiHandLandmarks[0]
    const ctx = drawCanvas.getContext("2d")

    /* Index finger tip = landmark 8 */
    const tip = landmarks[8]

    /* Mirror X since video is mirrored */
    const x = (1 - tip.x) * drawCanvas.width
    const y = tip.y * drawCanvas.height

    /* Check if index finger is UP (drawing mode) */
    /* Index tip (8) should be above index PIP (6) */
    const indexUp = landmarks[8].y < landmarks[6].y

    /* Check if other fingers are down (fist = erase/stop) */
    const middleDown = landmarks[12].y > landmarks[10].y
    const ringDown   = landmarks[16].y > landmarks[14].y

    /* Drawing only when index is up and others are curled */
    isDrawing = indexUp && middleDown && ringDown

    if (isDrawing) {
      if (lastX !== null && lastY !== null) {
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = currentColor
        ctx.lineWidth = 4
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.shadowColor = currentColor
        ctx.shadowBlur = 8
        ctx.stroke()

        /* Store points for heart detection */
        drawPoints.push({ x, y })
        if (drawPoints.length > 150) drawPoints.shift()

        /* Check for heart shape */
        if (!heartDetected && drawPoints.length > 60) {
          checkHeart(drawPoints)
        }
      }

      /* Fingertip glow dot */
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = currentColor
      ctx.shadowColor = currentColor
      ctx.shadowBlur = 15
      ctx.fill()

      lastX = x
      lastY = y
    } else {
      /* Show cursor dot even when not drawing */
      const prev = ctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height)

      /* Small indicator dot */
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,0.4)"
      ctx.shadowBlur = 0
      ctx.fill()

      lastX = null
      lastY = null

      /* Restore after showing dot */
      setTimeout(() => {
        if (drawCanvas) ctx.putImageData(prev, 0, 0)
      }, 50)
    }
  }

  /* === HEART DETECTION ===
     Simple heuristic: check if drawn path forms a rough heart shape
     - Has a top-wide, bottom-narrow profile
     - Y range is significant
     - X range covers decent width
  */
  function checkHeart(pts) {
    if (pts.length < 60) return

    const xs = pts.map(p => p.x)
    const ys = pts.map(p => p.y)
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minY = Math.min(...ys), maxY = Math.max(...ys)

    const width  = maxX - minX
    const height = maxY - minY

    if (width < 60 || height < 50) return

    /* Top half should be wider than bottom */
    const midY = (minY + maxY) / 2
    const topPts = pts.filter(p => p.y < midY)
    const botPts = pts.filter(p => p.y >= midY)

    if (topPts.length < 10 || botPts.length < 10) return

    const topWidth = Math.max(...topPts.map(p=>p.x)) - Math.min(...topPts.map(p=>p.x))
    const botWidth = Math.max(...botPts.map(p=>p.x)) - Math.min(...botPts.map(p=>p.x))

    /* Check if path comes back (closed-ish loop) */
    const first = pts[0]
    const last  = pts[pts.length - 1]
    const dist  = Math.hypot(first.x - last.x, first.y - last.y)
    const isLoop = dist < width * 0.6

    if (topWidth > botWidth * 0.8 && isLoop) {
      heartDetected = true
      triggerHeartMagic()
    }
  }

  /* === HEART MAGIC ANIMATION === */
  function triggerHeartMagic() {
    status.textContent = "💙 Heart detect hua!! Special moment! 💙"

    /* Screen flash */
    const flash = document.createElement("div")
    flash.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: radial-gradient(circle at center, rgba(255,100,180,0.4), transparent 70%);
      pointer-events: none; opacity: 0;
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(flash)
    setTimeout(() => { flash.style.opacity = "1" }, 0)
    setTimeout(() => { flash.style.opacity = "0" }, 400)
    setTimeout(() => flash.remove(), 800)

    /* Big heart explosion from center of canvas */
    const rect = drawCanvas.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement("span")
        heart.innerHTML = ["💙","💜","🩷","💗","✨"][Math.floor(Math.random()*5)]
        const angle = Math.random() * 360
        const dist  = 80 + Math.random() * 120
        const dx = Math.cos(angle * Math.PI/180) * dist
        const dy = Math.sin(angle * Math.PI/180) * dist
        const size = 20 + Math.random() * 24

        heart.style.cssText = `
          position: fixed;
          left: ${cx}px; top: ${cy}px;
          font-size: ${size}px;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%,-50%);
          transition: transform 1.2s cubic-bezier(0.34,1.56,0.64,1), opacity 1.2s ease;
          opacity: 1;
        `
        document.body.appendChild(heart)
        requestAnimationFrame(() => {
          heart.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
          heart.style.opacity = "0"
        })
        setTimeout(() => heart.remove(), 1400)
      }, i * 40)
    }

    /* Special message overlay */
    const msg = document.createElement("div")
    msg.style.cssText = `
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: clamp(20px, 5vw, 28px);
      color: white;
      text-shadow: 0 0 30px rgba(255,150,200,0.8);
      text-align: center;
      padding: 20px;
      background: rgba(0,0,0,0.5);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 10;
      border-radius: 20px;
    `
    msg.innerHTML = "Tu ne heart banaya… 💙<br><span style='font-size:0.6em;opacity:0.8;'>Main samajh gaya. 😄</span>"
    wrapper.appendChild(msg)
    setTimeout(() => { msg.style.opacity = "1" }, 200)
    setTimeout(() => {
      msg.style.opacity = "0"
      setTimeout(() => msg.remove(), 600)
    }, 3500)

    /* Reset after 4 sec so can detect again */
    setTimeout(() => {
      heartDetected = false
      status.textContent = "Phir se try karo! ✍️"
    }, 5000)
  }

  /* === START === */
  setupMediaPipe()
}
