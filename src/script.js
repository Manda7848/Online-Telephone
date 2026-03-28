window.onload = () => {

function instructions() {
document.getElementById("intro1").onclick = show;
}
 function show() {
document.getElementById("intro2").style.display = "flex"; 

document.getElementById("intro1").style.display = "none"; 
document.getElementById("click").style.display = "none"; 
document.getElementById("commence").style.display = "flex";
 }

instructions();


// ALL FOR Animation. WHY IS THERE NO BUILT IN FEATURE!?

var i = 0;
var next = "Click To Proceed......"
var time = setInterval(write, 70);

function write() {
var target = document.getElementById("click");


if (next[i]) {
target.innerHTML += next[i];
i++;
console.log(target);



} else{   clearInterval(time);}


}

write();


}