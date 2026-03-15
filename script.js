const yesBtn = document.getElementById("yesBtn")
const noBtn = document.getElementById("noBtn")
const msg = document.getElementById("message")
const music = document.getElementById("music")

let noClicks = 0
let triedNo = false

const questions = [

"Do you like ice-cream? 🍦",
"Do you enjoy peaceful walks? 🌇",
"Do you smile when you're happy? 😊",
"Do you like spending time with someone special? 💙",
"Would you like a little surprise today? 🎁"

]

let answers = []
let currentQuestion = -1

const questionText = document.getElementById("question")

function nextQuestion(){

currentQuestion++

if(currentQuestion < questions.length){

questionText.innerHTML = questions[currentQuestion]

}else{

showResult()

}

}

yesBtn.onclick = () => {

answers.push("yes")
nextQuestion()

}

noBtn.onclick = () => {

answers.push("no")
nextQuestion()

}

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

document.body.classList.add("night")

/* container change (music continue रहेगा) */

document.querySelector(".container").innerHTML = `

<h1 class="dateText">So it's a date 💙</h1>

<div class="loveMeter">
<div class="loveFill"></div>
</div>

<img src="icecream.png" width="200" class="ice">

<img src="couple.gif" width="220" style="margin-top:10px;">

<p style="margin-top:20px;font-size:18px;">
Ice-cream 🍦, peaceful walk and your shy smile 😊
</p>

<div class="stars"></div>


`

/* setTimeout(runTeddy,2000) */
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

let x = Math.random() * (window.innerWidth - 120)
let y = Math.random() * (window.innerHeight - 60)

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

function showResult(){

let yesCount = answers.filter(a => a==="yes").length

if(yesCount >=3){

questionText.innerHTML="Looks like you enjoy sweet moments 💙"

}else{

questionText.innerHTML="Hmm... maybe I can still change your mind 😌"

}

setTimeout(showDateQuestion,2000)

}

function showDateQuestion(){

document.querySelector(".container").innerHTML = `

<h1>Will you go on an ice-cream date with me? 🍦</h1>

<img src="couple.gif" class="hero">

<div class="buttons">
<button id="yesFinal">Yes 💙</button>
<button id="noFinal">No 🙈</button>
</div>

<p id="message"></p>

`

const yesFinal = document.getElementById("yesFinal")
const noFinal = document.getElementById("noFinal")

yesFinal.onclick = () => {

document.querySelector(".container").innerHTML = `
<h1 class="dateText">So it's a date 💙</h1>

<div class="loveMeter">
<div class="loveFill"></div>
</div>

<img src="icecream.png" width="200" class="ice">

<img src="couple.gif" width="220">

<p>Ice-cream 🍦, peaceful walk and your shy smile 😊</p>
`

}

noFinal.onclick = () => {

document.getElementById("message").innerHTML="Are you sure? There will be ice-cream 🍦"

}

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
