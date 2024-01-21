const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const msgInput = document.getElementById('messageInp');
const msgContainer = document.querySelector('.chatcontainer');
const username = document.getElementById('username');
const sendButton = document.getElementById('send');
// assuming 'chatcontainer' is a class

const append = (msg, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = msg;
    msgElement.classList.add('msg');
    msgElement.classList.add('message'); // use 'position' to set the appropriate class
    msgContainer.append(msgElement);
};



sendButton.addEventListener('click', () => {
    const message = msgInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
});



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
});

const name = prompt('Enter your name to join');
username.innerHTML = name;
socket.emit('new-user-joined', name);

socket.on('user-joined', data => {
    append(`${data} joined chat`, 'left'); // Use 'data' directly for the user name
});

socket.on('receive', data => {
    append(`${data.name}::${data.message}`, 'right');
});

socket.on('left', data => {
    append(`${data} left the chat`, 'left');
});
