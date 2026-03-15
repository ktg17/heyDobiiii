const yesBtn = document.getElementById("yesBtn")
const noBtn = document.getElementById("noBtn")
const msg = document.getElementById("message")

let noClicks = 0
let triedNo = false

yesBtn.onclick = () => {

music.play()

if(!triedNo){

msg.innerHTML="Wait 😄 try clicking NO first… there is a surprise."

return
}

document.body.innerHTML = `
<div style="text-align:center;margin-top:120px">

<h1>🎉 Date Confirmed 💙</h1>

<img src="icecream.png" width="200">

<p>Ice-cream + peaceful walk + shy smiles 😊</p>

</div>
`

}

noBtn.onclick = () => {

triedNo = true
noClicks++

if(noClicks==1){

msg.innerHTML="Are you sure? There will be ice-cream 🍦"

}

else if(noClicks==2){

msg.innerHTML="Think again… best ice-cream date ever 😌"

}

else if(noClicks==3){

msg.innerHTML="Last chance… I might share my ice-cream."

}

else{

msg.innerHTML="Okay okay you can't say NO 😝"

noBtn.onmouseover = () => {

let x = Math.random()*window.innerWidth
let y = Math.random()*window.innerHeight

noBtn.style.position="absolute"
noBtn.style.left=x+"px"
noBtn.style.top=y+"px"

}

}

}

/* music */

const music = document.getElementById("music")
const musicBtn = document.getElementById("musicToggle")

musicBtn.onclick = () => {

if(music.paused){

music.play()
musicBtn.innerHTML="🔇"

}else{

music.pause()
musicBtn.innerHTML="🎵"

}

}

/* floating hearts */

let heartCount = 0

let heartInterval = setInterval(()=>{

if(heartCount > 25){
clearInterval(heartInterval)
return
}

const heart = document.createElement("span")

heart.innerHTML="💙"

heart.style.position="absolute"
heart.style.left=Math.random()*100+"vw"
heart.style.top=Math.random()*100+"vh"

document.body.appendChild(heart)

heartCount++

},300)
