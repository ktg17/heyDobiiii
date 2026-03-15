const yesBtn = document.getElementById("yesBtn")
const noBtn = document.getElementById("noBtn")
const msg = document.getElementById("message")
const music = document.getElementById("music")

let noClicks = 0
let triedNo = false

/* autoplay music */

window.addEventListener("click", () => {
music.play()
},{once:true})


/* YES button */

yesBtn.onclick = () => {

if(!triedNo){

msg.innerHTML="Wait 😄 try clicking NO first… there is a surprise."
return
}

/* hearts stop */
clearInterval(heartInterval)

/* container change (music continue रहेगा) */

document.querySelector(".container").innerHTML = `

<h1 style="font-size:34px;margin-top:20px;">
So it's a date 💙
</h1>

<img src="icecream.png" width="200" style="margin-top:20px;">

<img src="couple.gif" width="220" style="margin-top:10px;">

<p style="margin-top:20px;font-size:18px;">
Ice-cream 🍦, peaceful walk and your shy smile 😊
</p>

`

`

startConfetti()

}


/* NO button */

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


/* FLOATING HEARTS (slow) */

let heartInterval = setInterval(()=>{

const heart = document.createElement("span")

heart.innerHTML="💙"

heart.style.position="absolute"
heart.style.left=Math.random()*100+"vw"
heart.style.top="100vh"
heart.style.fontSize=(Math.random()*20+15)+"px"
heart.style.animation="floatUp 10s linear"

document.body.appendChild(heart)

setTimeout(()=>{
heart.remove()
},10000)

},1500)



/* TYPING TEXT */

function typingEffect(){

const text="🎉 Date Confirmed 💙"
let i=0

function type(){

if(i<text.length){

document.getElementById("typeText").innerHTML+=text.charAt(i)
i++
setTimeout(type,80)

}

}

type()

}



/* CONFETTI */

function startConfetti(){

const canvas=document.getElementById("confetti")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let confetti=[]

for(let i=0;i<120;i++){

confetti.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*6+2,
d:Math.random()*50
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"

confetti.forEach(c=>{

ctx.beginPath()
ctx.arc(c.x,c.y,c.r,0,Math.PI*2)
ctx.fill()

})

update()

}

function update(){

confetti.forEach(c=>{
c.y+=2
if(c.y>canvas.height) c.y=0
})

}

setInterval(draw,20)

}



// /* ICECREAM RAIN */

// function iceCreamRain(){

// setInterval(()=>{

// const ice=document.createElement("img")

// ice.src="icecream.png"

// ice.style.position="absolute"
// ice.style.left=Math.random()*100+"vw"
// ice.style.top="-50px"
// ice.style.width="40px"
// ice.style.animation="fall 6s linear"

// document.body.appendChild(ice)

// setTimeout(()=>{
// ice.remove()
// },6000)

// },800)

// }
