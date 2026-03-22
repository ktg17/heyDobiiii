const yesBtn = document.getElementById("yesBtn")
const noBtn = document.getElementById("noBtn")
const msg = document.getElementById("message")
const music = document.getElementById("music")
const bgMusic = document.getElementById("music")

/* MUSIC */

document.body.addEventListener("click", () => {
music.play()
},{once:true})

/* QUIZ QUESTIONS */

const questions = [

"Do you like ice-cream? 🍦",
"Do you enjoy peaceful walks? 🌇",
"Do you smile when you're happy? 😊",
"Do you like spending time with someone special? 💙",
"Would you like a little surprise today? 🎁"

]

const replies = [

{ yes: "Ice-cream lover 😄 perfect start!", no: "Ohh... I’ll change your mind someday 😏" },

{ yes: "Peaceful walks + you = perfect combo 🌇", no: "No walks? okay... we’ll just sit together 😊" },

{ yes: "That smile is my favorite already 😊", no: "I’ll try to make you smile then 😌" },

{ yes: "Someone special huh… interesting 💙", no: "Maybe I can become that someone 😏" },

{ yes: "Good… surprises are my thing 🎁", no: "Still… I might surprise you anyway 😄" }

]

let answers = []
let currentQuestion = 0

const questionText = document.getElementById("question")

function showQuestion(){

questionText.innerHTML = questions[currentQuestion]

}

/* QUIZ BUTTONS */

yesBtn.onclick = () => {

answers.push("yes")

typeReply(replies[currentQuestion].yes)

setTimeout(()=>{
msg.innerHTML=""
nextQuestion()
},3000)

}

noBtn.onclick = () => {

answers.push("no")

typeReply(replies[currentQuestion].no)

setTimeout(()=>{
msg.innerHTML=""
nextQuestion()
},3000)

}

function nextQuestion(){

currentQuestion++

if(currentQuestion < questions.length){

showQuestion()

}else{

showResult()

}

}

/* RESULT */

function showResult(){

let yesCount = answers.filter(a => a==="yes").length

if(yesCount >=3){

questionText.innerHTML="Looks like you enjoy sweet moments 💙"

}else{

questionText.innerHTML="Hmm... maybe I can still change your mind 😌"

}

document.querySelector(".buttons").style.display="none"
document.querySelector(".hero").style.display="none"

setTimeout(startCinema,1500)

}

/* DATE QUESTION */

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

dateLogic()

}

/* FINAL DATE LOGIC */

function dateLogic(){

let noClicks = 0
let triedNo = false

const yesFinal = document.getElementById("yesFinal")
const noFinal = document.getElementById("noFinal")
const msg = document.getElementById("message")

yesFinal.onclick = () => {

if(!triedNo){

msg.innerHTML="Wait 😄 try clicking NO first… there is a surprise."
return

}

/* FINAL PAGE */

document.body.classList.add("night")

document.querySelector(".container").innerHTML = `

<h1 class="dateText">So it's a date 💙</h1>

<div class="loveMeter">
<div class="loveFill"></div>
</div>

<img src="icecream.png" width="200" class="ice">

<img src="couple.gif" width="220">

<p>Ice-cream 🍦, peaceful walk and your shy smile 😊</p>

<div class="stars"></div>

`

}

noFinal.onclick = () => {

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

function moveButton(){

const container = document.querySelector(".container")
const rect = container.getBoundingClientRect()

const yesRect = yesFinal.getBoundingClientRect()

/* YES के आसपास range */

let x = yesRect.left + (Math.random()*100 - 50)
let y = yesRect.top + (Math.random()*60 - 30)

/* LIMIT अंदर रखना */

if(x < rect.left) x = rect.left + 10
if(x > rect.right - 100) x = rect.right - 100

if(y < rect.top) y = rect.top + 10
if(y > rect.bottom - 50) y = rect.bottom - 50

noFinal.style.position="fixed"

/* smooth movement */
noFinal.style.transition="0.3s"

noFinal.style.left = x + "px"
noFinal.style.top = y + "px"

}

}

}

/* FLOATING HEARTS */

let heartInterval = setInterval(()=>{

const heart = document.createElement("span")

heart.innerHTML="💙"

heart.style.position="absolute"
heart.style.left=Math.random()*100+"vw"
heart.style.top="100vh"
heart.style.fontSize=(Math.random()*20+15)+"px"
heart.style.animation="floatUp 10s linear"

document.querySelector(".bg-hearts").appendChild(heart)

setTimeout(()=>{
heart.remove()
},10000)

},1500)

/* START QUIZ */

showQuestion()

function startCinema(){

const cinema = document.getElementById("cinema")
const textBox = document.getElementById("emotionalText")
const bouquet = document.getElementById("bouquet")
const voice = document.getElementById("voice")

cinema.classList.add("show")

const text = `Sach bolu…  
Mujhe tumse bahut si baatein karni hoti hai…  

Par pata nahi kyun…  
Jab tum saamne hoti ho…  
Sab kuch blank ho jata hai…  

Main introvert hoon na…  
Isliye "kuch nahi" bol deta hoon…  

Par sach mein…  
bohot kuch hota hai kehne ko… 💙`

let i = 0

function type(){
if(i < text.length){
textBox.innerHTML += text.charAt(i)
i++
setTimeout(type,70)
}else{

/* bouquet + audio */

setTimeout(()=>{

/* थोड़ा wait ताकि user पढ़ सके */
setTimeout(()=>{

bouquet.classList.add("show")

/* music slow */
bgMusic.volume = 0.1

voice.play()

/* जब audio खत्म हो */
voice.onended = () => {

bgMusic.volume = 1

document.getElementById("cinema").classList.remove("show")

showDateQuestion()

}

},2000)   // 👉 2 second extra wait

},500)

}
}

type()
}

function typeReply(text){

msg.innerHTML = ""

let i = 0

function type(){
if(i < text.length){
msg.innerHTML += text.charAt(i)
i++
setTimeout(type,60)
}
}

type()

}
