window.onload = () => {

// document.getElementById("join").onclick = () => {
// const player = document.getElementById("name").value.trim();
// const room = document.getElementById("room").value.trim();
// console.log(player,room);
// }




let id = 0
 const create = document.getElementById("create");

create.onclick = console.log("Join was clicked");
create.onclick = generateid;


function generateid() {
id = Math.floor(Math.random() * 500) + 1000;
console.log("Your room id is =", id);
// document.getElementById("id1").innerText = id;
document.getElementById("id2").innerText = id;
}

setInterval (document.getElementById("id1").innerText = document.getElementById("room").innerText, 1000);


}

