const socket = io()

const chatbox = document.querySelector('#chatbox')
const msgContainer = document.querySelector('#messagesLog')


let user

Swal.fire({
  title: 'Please state provide an email address',
  input: 'email',
  text: 'Welcome to the Coderhouse chat app',
  inputValidator: (value) => {
    return !value && 'You have to state your email'
  },
  allowOutsideClick: false
}).then( res => {
  user = res.value
})


chatbox.addEventListener('keyup', (e)=> {
  if(e.key === 'Enter') {
    if(chatbox.value.trim().length > 0) {
      // socket.emit('message', `<b>${user}:</b> ${chatbox.value}`)
      socket.emit('message', {user: user, message: chatbox.value})
      chatbox.value = ''
    }
  }  
})

socket.on('messagesLogs', (data) => {
  let messagesList = ''
  data.forEach( (msg) => {
    messagesList +=  `${msg.user}: ${msg.message} ` + `<br>`
  })

  msgContainer.innerHTML = messagesList
})