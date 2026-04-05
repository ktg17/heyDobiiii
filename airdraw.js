/* ============================================
   AIRDRAW — Smooth Air Drawing
   - Smooth bezier curves (no dots!)
   - Better index finger detection
   - Heart detection + special animation
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
    padding: 24px 16px 40px;
    opacity: 0;
    transition: opacity 0.8s ease;
    overflow-y: auto;
    scrollbar-width: none;
  `
  document.body.appendChild(airPage)
  setTimeout(() => { airPage.style.opacity = "1" }, 50)

  /* === TITLE === */
  const title = document.createElement("div")
  title.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: clamp(17px, 3.5vw, 24px);
    color: white;
    text-align: center;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #fff 40%, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `
  title.innerHTML = "Hawa mein draw karo, Dobi ✨"
  airPage.appendChild(title)

  const subtitle = document.createElement("div")
  subtitle.style.cssText = `
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    text-align: center;
    margin-bottom: 12px;
  `
  subtitle.textContent = "☝️ Sirf index finger uthao → draw shuru | Baaki fingers band karo → ruko | 💙 Heart banao → surprise!"
  airPage.appendChild(subtitle)

  /* === STATUS === */
  const status = document.createElement("div")
  status.id = "airStatus"
  status.style.cssText = `
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(167,139,250,0.8);
    margin-bottom: 10px;
    text-align: center;
    min-height: 20px;
  `
  status.textContent = "Camera load ho rahi hai… 🎥"
  airPage.appendChild(status)

  /* === WRAPPER === */
  const wrapper = document.createElement("div")
  wrapper.style.cssText = `
    position: relative;
    width: min(520px, 96vw);
    aspect-ratio: 4/3;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 0 50px rgba(167,139,250,0.15);
    background: #000;
  `
  airPage.appendChild(wrapper)

  /* VIDEO — mirrored */
  const video = document.createElement("video")
  video.autoplay = true
  video.playsInline = true
  video.muted = true
  video.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    opacity: 0.35;
  `
  wrapper.appendChild(video)

  /* DRAWING CANVAS */
  const drawCanvas = document.createElement("canvas")
  drawCanvas.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
  `
  wrapper.appendChild(drawCanvas)

  /* CURSOR DOT CANVAS — separate so drawing doesn't get erased */
  const cursorCanvas = document.createElement("canvas")
  cursorCanvas.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  `
  wrapper.appendChild(cursorCanvas)

  /* === BUTTONS === */
  const btnRow = document.createElement("div")
  btnRow.style.cssText = "display:flex; gap:12px; margin-top:16px; flex-wrap:wrap; justify-content:center; align-items:center;"
  airPage.appendChild(btnRow)

  const colorOptions = [
    { color: "#ff6eb4", label: "Pink" },
    { color: "#00d2ff", label: "Blue" },
    { color: "#a78bfa", label: "Purple" },
    { color: "#ffd700", label: "Gold" },
    { color: "#ffffff", label: "White" }
  ]
  let currentColor = "#ff6eb4"

  colorOptions.forEach(({ color }) => {
    const dot = document.createElement("div")
    dot.style.cssText = `
      width: 30px; height: 30px;
      border-radius: 50%;
      background: ${color};
      cursor: pointer;
      border: 3px solid ${color === currentColor ? "white" : "transparent"};
      transition: transform 0.2s, border 0.2s;
      box-shadow: 0 0 12px ${color}88;
    `
    dot.onclick = () => {
      currentColor = color
      document.querySelectorAll(".airdraw-color-dot").forEach(d => {
        d.style.border = "3px solid transparent"
        d.style.transform = ""
      })
      dot.style.border = "3px solid white"
      dot.style.transform = "scale(1.2)"
    }
    dot.classList.add("airdraw-color-dot")
    btnRow.appendChild(dot)
  })

  /* Brush size */
  const sizeSlider = document.createElement("input")
  sizeSlider.type = "range"
  sizeSlider.min = "2"
  sizeSlider.max = "12"
  sizeSlider.value = "5"
  sizeSlider.style.cssText = `
    width: 80px;
    accent-color: #a78bfa;
    cursor: pointer;
  `
  btnRow.appendChild(sizeSlider)

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
    drawPoints = []
    heartDetected = false
    pathHistory = []
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
    stopAll()
    airPage.style.opacity = "0"
    setTimeout(() => airPage.remove(), 800)
  }
  btnRow.appendChild(closeBtn)

  /* === STATE === */
  let cameraStream   = null
  let handsModel     = null
  let animFrame      = null
  let heartDetected  = false
  let drawPoints     = []
  let pathHistory    = []  // for heart detection

  /* Smooth drawing state */
  let smoothX = null
  let smoothY = null
  let prevX   = null
  let prevY   = null
  let isDrawing = false

  /* Smoothing factor — 0 = no smooth, 1 = max smooth */
  const SMOOTH = 0.55

  function stopAll() {
    if (cameraStream) cameraStream.getTracks().forEach(t => t.stop())
    if (animFrame)    cancelAnimationFrame(animFrame)
    if (handsModel)   handsModel.close && handsModel.close()
  }

  /* === LOAD MEDIAPIPE === */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
      const s = document.createElement("script")
      s.src = src
      s.crossOrigin = "anonymous"
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
  }

  async function setup() {
    try {
      status.textContent = "Hand model load ho raha hai… ⏳"

      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js")
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js")
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js")

      handsModel = new Hands({
        locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
      })

      handsModel.setOptions({
        maxNumHands:            1,
        modelComplexity:        1,
        minDetectionConfidence: 0.75,
        minTrackingConfidence:  0.7
      })

      handsModel.onResults(onResults)

      /* Camera */
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" }
      })
      cameraStream = stream
      video.srcObject = stream

      await new Promise(res => { video.onloadedmetadata = res })
      video.play()

      drawCanvas.width    = video.videoWidth  || 640
      drawCanvas.height   = video.videoHeight || 480
      cursorCanvas.width  = drawCanvas.width
      cursorCanvas.height = drawCanvas.height

      status.textContent = "☝️ Index finger uthao aur draw karo!"
      loop()

    } catch (err) {
      console.error(err)
      if (err.name === "NotAllowedError") {
        status.textContent = "Camera permission deny kiya — browser settings mein allow karo 🙏"
      } else {
        status.textContent = "Kuch error aaya 😕 — page refresh karo"
      }
    }
  }

  /* === MAIN LOOP === */
  async function loop() {
    if (video.readyState >= 2 && handsModel) {
      await handsModel.send({ image: video })
    }
    animFrame = requestAnimationFrame(loop)
  }

  /* === HAND RESULTS === */
  function onResults(results) {
    const drawCtx   = drawCanvas.getContext("2d")
    const cursorCtx = cursorCanvas.getContext("2d")

    /* Clear cursor canvas every frame */
    cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height)

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      smoothX = null; smoothY = null
      prevX   = null; prevY   = null
      isDrawing = false
      return
    }

    const lm = results.multiHandLandmarks[0]

    /* Mirror X (video is mirrored) */
    const rawX = (1 - lm[8].x) * drawCanvas.width
    const rawY =      lm[8].y  * drawCanvas.height

    /* === SMOOTH position with lerp === */
    if (smoothX === null) { smoothX = rawX; smoothY = rawY }
    smoothX = smoothX + (rawX - smoothX) * (1 - SMOOTH)
    smoothY = smoothY + (rawY - smoothY) * (1 - SMOOTH)

    const x = smoothX
    const y = smoothY

    /* === FINGER STATE DETECTION ===
       Index UP  = tip(8).y < pip(6).y  AND  tip(8).y < mcp(5).y
       Others DOWN = middle(12).y > middle_pip(10).y
                     ring(16).y   > ring_pip(14).y
                     pinky(20).y  > pinky_pip(18).y
    */
    const indexUp  = lm[8].y < lm[6].y && lm[8].y < lm[5].y
    const middleDown = lm[12].y > lm[10].y
    const ringDown   = lm[16].y > lm[14].y
    const pinkyDown  = lm[20].y > lm[18].y

    /* Drawing = index up, others down */
    const shouldDraw = indexUp && middleDown && ringDown && pinkyDown

    /* === CURSOR DOT (always show) === */
    const dotColor = shouldDraw ? currentColor : "rgba(255,255,255,0.5)"
    cursorCtx.beginPath()
    cursorCtx.arc(x, y, shouldDraw ? 8 : 5, 0, Math.PI * 2)
    cursorCtx.fillStyle = dotColor
    cursorCtx.shadowColor = dotColor
    cursorCtx.shadowBlur  = shouldDraw ? 16 : 6
    cursorCtx.fill()

    /* === DRAWING === */
    if (shouldDraw) {
      isDrawing = true

      if (prevX !== null && prevY !== null) {
        const brushSize = parseInt(sizeSlider.value)

        drawCtx.beginPath()
        drawCtx.moveTo(prevX, prevY)

        /* Smooth bezier curve through midpoint */
        const midX = (prevX + x) / 2
        const midY = (prevY + y) / 2
        drawCtx.quadraticCurveTo(prevX, prevY, midX, midY)

        drawCtx.strokeStyle = currentColor
        drawCtx.lineWidth   = brushSize
        drawCtx.lineCap     = "round"
        drawCtx.lineJoin    = "round"
        drawCtx.shadowColor = currentColor
        drawCtx.shadowBlur  = brushSize * 2
        drawCtx.stroke()

        /* Store for heart detection */
        pathHistory.push({ x, y })
        if (pathHistory.length > 200) pathHistory.shift()

        if (!heartDetected && pathHistory.length > 80) {
          checkHeart(pathHistory)
        }
      }

      prevX = x
      prevY = y

    } else {
      /* Pen lifted — reset prev points */
      if (isDrawing && prevX !== null) {
        /* Segment break — reset path history for new stroke */
        pathHistory = []
      }
      isDrawing = false
      prevX = null
      prevY = null
    }
  }

  /* === HEART DETECTION ===
     Check if drawn stroke resembles a heart:
     - Wide top, narrow bottom
     - Closed-ish loop
     - Decent size
  */
  function checkHeart(pts) {
    if (pts.length < 80) return

    const xs = pts.map(p => p.x)
    const ys = pts.map(p => p.y)
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minY = Math.min(...ys), maxY = Math.max(...ys)

    const width  = maxX - minX
    const height = maxY - minY

    /* Minimum size check */
    if (width < 80 || height < 60) return

    const midY = (minY + maxY) / 2

    const topPts = pts.filter(p => p.y < midY)
    const botPts = pts.filter(p => p.y >= midY)
    if (topPts.length < 20 || botPts.length < 20) return

    const topW = Math.max(...topPts.map(p=>p.x)) - Math.min(...topPts.map(p=>p.x))
    const botW = Math.max(...botPts.map(p=>p.x)) - Math.min(...botPts.map(p=>p.x))

    /* Top should be wider than bottom */
    if (topW < botW * 0.7) return

    /* Check loop closure */
    const first = pts[0]
    const last  = pts[pts.length - 1]
    const dist  = Math.hypot(first.x - last.x, first.y - last.y)
    if (dist > width * 0.7) return

    heartDetected = true
    triggerHeartMagic()
  }

  /* === HEART MAGIC === */
  function triggerHeartMagic() {
    status.textContent = "💙 Heart detect hua!! 💙"

    /* Screen flash */
    const flash = document.createElement("div")
    flash.style.cssText = `
      position:fixed; inset:0; z-index:99999;
      background: radial-gradient(circle at center, rgba(255,100,180,0.45), transparent 70%);
      pointer-events:none; opacity:0;
      transition: opacity 0.25s ease;
    `
    document.body.appendChild(flash)
    setTimeout(() => { flash.style.opacity = "1" }, 0)
    setTimeout(() => { flash.style.opacity = "0.6" }, 250)
    setTimeout(() => { flash.style.opacity = "0" }, 500)
    setTimeout(() => flash.remove(), 800)

    /* Hearts explosion */
    const rect = wrapper.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2

    const emojis = ["💙","💜","🩷","💗","💖","✨","🌸"]
    for (let i = 0; i < 24; i++) {
      setTimeout(() => {
        const h = document.createElement("span")
        h.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
        const angle = (i / 24) * 360 + Math.random() * 20
        const dist  = 100 + Math.random() * 140
        const dx = Math.cos(angle * Math.PI / 180) * dist
        const dy = Math.sin(angle * Math.PI / 180) * dist
        const size = 22 + Math.random() * 20

        h.style.cssText = `
          position:fixed;
          left:${cx}px; top:${cy}px;
          font-size:${size}px;
          pointer-events:none;
          z-index:99998;
          transform:translate(-50%,-50%);
          transition: transform 1.4s cubic-bezier(0.34,1.56,0.64,1), opacity 1.4s ease;
          opacity:1;
        `
        document.body.appendChild(h)
        requestAnimationFrame(() => {
          h.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.5)`
          h.style.opacity   = "0"
        })
        setTimeout(() => h.remove(), 1600)
      }, i * 35)
    }

    /* Message overlay on canvas */
    const overlay = document.createElement("div")
    overlay.style.cssText = `
      position:absolute; inset:0;
      display:flex; align-items:center; justify-content:center;
      flex-direction: column;
      gap: 8px;
      font-family:'Playfair Display',serif;
      color:white;
      text-align:center;
      padding:24px;
      background:rgba(0,0,0,0.55);
      backdrop-filter: blur(4px);
      opacity:0;
      transition:opacity 0.5s ease;
      z-index:10;
      border-radius:20px;
    `
    overlay.innerHTML = `
      <div style="font-size:clamp(22px,5vw,32px);text-shadow:0 0 30px rgba(255,150,200,0.9)">Tu ne heart banaya… 💙</div>
      <div style="font-size:clamp(14px,3vw,18px);opacity:0.75">Main samajh gaya. 😄</div>
    `
    wrapper.appendChild(overlay)
    setTimeout(() => { overlay.style.opacity = "1" }, 200)
    setTimeout(() => {
      overlay.style.opacity = "0"
      setTimeout(() => overlay.remove(), 600)
    }, 3800)

    /* Reset for next attempt */
    setTimeout(() => {
      heartDetected = false
      pathHistory   = []
      status.textContent = "☝️ Phir se draw karo!"
    }, 5000)
  }

  /* === GO === */
  setup()
}
