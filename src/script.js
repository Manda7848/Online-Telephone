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


}