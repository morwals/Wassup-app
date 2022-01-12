var socket = io();
    
const form=document.getElementById("frm");

const messageInp=document.getElementById("msginp");

const msgContainer=document.getElementById("container");

var audio= new Audio('audio.wav');

const append = (msg,position)=>{
  const msgElement = document.createElement("div");
  msgElement.innerText=msg;
  msgElement.classList.add("msg");
  msgElement.classList.add(position);
  msgContainer.append(msgElement);

  if(position==="left"){
    audio.play();
  }
}

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const m=messageInp.value;
  append("you: "+m,"right");
  socket.emit("send",m);
  messageInp.value="";
});

const nam =prompt("Enter your username to start chat.");
socket.emit("new-user-joined", nam);


socket.on("user-joined",name=>{
    append(name+" joined the chat.","center");
});

socket.on("receive",data=>{
  append(data.name+" :"+data.message,"left");
});

socket.on("left",data=>{
  append(data+" left the chat","center");
});
