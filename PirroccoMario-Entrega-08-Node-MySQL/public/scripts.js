const ioClient = io()

const submit = document.querySelector('#submit')
const message = document.querySelector('#message')
const msgContainer = document.querySelector('#messages-container')


submit.addEventListener('click', () => {  
  ioClient.emit('newMessage', message.value)
})

ioClient.on('messages', (msgs) => {
  let html = msgs.map((msg) => {
    return `<p>${msg.from}: ${msg.text}</p>`
  }).join(' ')
  msgContainer.innerHTML = html
})

 