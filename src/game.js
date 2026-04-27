window.onload = () => {

// document.getElementById("join").onclick = () => {
// const player = document.getElementById("name").value.trim();
// const room = document.getElementById("room").value.trim();
// console.log(player,room);
// }




let id = 0
 const join = document.getElementById("join");

join.onclick = console.log("Join was clicked");
join.onclick = generateid;


function generateid() {
id = Math.floor(Math.random() * 500) + 1000;
console.log("Your room id is =", id);
document.getElementById("id").innerText = id;

}
}

