



window.onload = () => {

function instructions() {
document.getElementById("intro1").onclick = transition;
}
 const sheet = document.getElementById("sheet");
 const main = document.getElementById("main");
var whoosh = new Audio("./videoplayback_[cut_0sec].wav");



const change = (newUrl) => {
  window.location.href = newUrl;
}


document.getElementById("commence").onclick = () => {
    
    whoosh.play(); 

    setTimeout(() => {
         change("./game.html");
    }, 250)
}


//  function show() {
// document.getElementById("intro2").style.display = "flex"; 

// document.getElementById("intro1").style.display = "none"; 
// document.getElementById("click").style.display = "none"; 
// document.getElementById("commence").style.display = "flex";
// transition();
//  }


function transition() {
    var i1 = document.getElementById("intro1");
    var i2 = document.getElementById("intro2");
    var click = document.getElementById("click");
    var commence = document.getElementById("commence");

    i1.classList.add("invisible"); 
    click.classList.add("invisible");
    
    setTimeout( () => {
        i1.style.display = "none"; 
        i2.style.display = "flex";
          commence.style.display= "flex";
        click.style.display = "none";
       whoosh.play(); 
       
    }, 300); 
}




var n = 0;
var dots = "........................................"
var timed = setInterval(dots1, 100);



function dots1() {
var dotted = document.getElementById("dots");


if (dots[n]) {
dotted.innerHTML += dots[n];
n++;
console.log(dots);



} else{   clearInterval(timed);}


}

var i = 0;
var next = "Click To Proceed......"
var time = setInterval(write, 200);


dots1();


function write() {
var target = document.getElementById("click");


if (next[i]) {
target.innerHTML += next[i];
i++;
console.log(target);



} else{   clearInterval(time);}


}

instructions();



setTimeout(() => {
sheet.classList.add("up");

setTimeout(() =>{
main.classList.remove("cannotclick");
console.log("Javascript did not break");
sheet.style.display = "none";
 whoosh.play();
}, 1500);


setTimeout(() => {
write();

console.log("the sound played");
}, 10000)


}, 2000);

// ALL FOR Animation. WHY IS THERE NO BUILT IN FEATURE!?






}