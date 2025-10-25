// script.js - common site scripts (login/register + small helpers)

// Chatbot functions rely on chatbot.js (must be included before using getChatbotReply)

// handle inline chat (for pages using it)
function addChatMessageGlobal(kind, text, chatBodyId='chatBody'){
  const body = document.getElementById(chatBodyId);
  if(!body) return;
  const div = document.createElement('div'); div.className = 'msg ' + (kind==='user'?'user':'bot');
  const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
  div.appendChild(bubble); body.appendChild(div); body.scrollTop = body.scrollHeight;
}

// LOGIN / REGISTER (simple)
function handleRegister(e){
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const u = { name, email, password };
  localStorage.setItem('hh_user', JSON.stringify(u));
  alert('Saved. Please login.');
  window.location.href = 'login.html';
}

function handleLogin(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;
  const u = JSON.parse(localStorage.getItem('hh_user') || 'null');
  if(u && u.email === email && u.password === pass){
    localStorage.setItem('hh_current', JSON.stringify({email:u.email,name:u.name}));
    alert('Login success');
    window.location.href = 'book_appointment.html';
  } else {
    alert('Invalid credentials');
  }
}

// shared chat UI functions (used in pages)
function toggleChat(){
  const win = document.getElementById('chatWindow');
  if(!win) return;
  win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
}
function sendChat(){
  const input = document.getElementById('chatInput');
  if(!input) return;
  const text = input.value.trim();
  if(!text) return;
  addChatMessageGlobal('user', text);
  const reply = window.getChatbotReply ? window.getChatbotReply(text) : "Assistant offline.";
  setTimeout(()=> addChatMessageGlobal('bot', reply), 300);
  input.value = '';
}