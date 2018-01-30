const socket = io();

console.log('ID', socket.id);

const sendMessageForm = document.getElementById('send-message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');
const usernameForm = document.getElementById('username-form');

usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const usernameEl = document.getElementById('username-input');
  const username = usernameEl.value;
  if(username === '') {
    return;
  } else {
    socket.emit('submit-username', {username});
    let header = document.getElementById('yoyo');
    header.textContent = 'Welcome ' + username.toUpperCase() + '!';
    
  }
});

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('send-message', {message: message});
  messageInput.value = '';
});

socket.on('receive-message', (data) => {
  console.log('RECEIVED:', data);
  let timestamp = new Date().toLocaleTimeString();
  let div = document.createElement('div');
  let codename = data.username.toUpperCase();
  div.textContent = timestamp + '      ' + codename + '  :   ' + data.message;
  messagesContainer.appendChild(div);
});

socket.on('set-header', (data) => {
  let codename = data.username.toUpperCase();
  let header = document.getElementById('yoyo');
  header.append( 'WELCOME ' + codename);
});