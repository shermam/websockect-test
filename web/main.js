const send = document.querySelector("#send");
const messages = document.querySelector('#messages');
const ws = new WebSocket("ws://127.0.0.1:3000/websocket", "teste");

send.addEventListener('click', () => {
    ws.send("oi")
});

ws.addEventListener('message', message => {
    console.log(message);
    messages.innerHTML += message.data;
})