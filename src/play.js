window.onload = () => {

const firebaseConfig = {
  apiKey: "AIzaSyA9SwtBw1A0t49YYqajQIPGK8Kx9ts7oTE",
  authDomain: "online-telephone-7848.firebaseapp.com",
  databaseURL: "https://online-telephone-7848-default-rtdb.firebaseio.com",
  projectId: "online-telephone-7848",
  storageBucket: "online-telephone-7848.firebasestorage.app",
  messagingSenderId: "881904369324",
  appId: "1:881904369324:web:7b08e84f42c4226671a909"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// console.log the room iddddd 
console.log("Firebase sucessfully redirected!");

const roomurl = window.location.search;
console.log(roomurl);

const urlparam = new URLSearchParams(roomurl);

const room = urlparam.get('room');
console.log("Your room ID is", room);


// ONLY UNCOMMENT TO NUKE THE DB
// database.ref('rooms').remove();






















}