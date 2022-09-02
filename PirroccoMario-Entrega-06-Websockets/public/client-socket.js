const socket = io()

const formProductos = document.querySelector('.form-records')
const formArtist = document.querySelector('#artist')
const formTitle = document.querySelector('#title')
const formPrice = document.querySelector('#price')
const formThumbnail = document.querySelector('#thumbnail')
const recordsCatalogue = document.querySelector('.records-catalogue')
const noRecords = document.querySelector('.no-records')
const loadedRecords = document.querySelector('.loaded-records')

/*-------- Records management --------*/
function postRecord() {
  try {
    const artist = formArtist.value
    const title = formTitle.value
    const price = formPrice.value
    const thumbnail = formThumbnail.value

    const recordObject = { artist, title, price, thumbnail }
    socket.emit('client:sendRecord', recordObject)

  } catch(err) {
    console.log(`There was an error: ${err}`)
  }
}

async function renderRecords(data) {
  try {
    const response = await fetch('/template.hbs')
    const templateHbs = await response.text()

    recordsCatalogue.innerHTML = '';
    if (data.length > 0) {
      loadedRecords.style.display = 'block';
      noRecords.style.display = 'none';
      data.forEach((record) => {
        const template = Handlebars.compile(templateHbs);
        const html = template(record);
        recordsCatalogue.innerHTML += html;
      });
    } else {
      loadedRecords.style.display = 'none'
      noRecords.style.display = 'block'
    }
  } catch(err) {
    console.log(`There was an error loading the catalogue, error: ${err}`)
  }
}

formProductos.addEventListener('submit', (e) => {
  e.preventDefault()
  postRecord()
  formProductos.reset()
})

socket.on('server:sendRecords', (data) => {
  renderRecords(data)
})


/*-------- Chat --------*/
const formMessages = document.querySelector('.form-messages')
const chatUserEmail = document.querySelector('#userEmail')
const chatUserMessage = document.querySelector('#userMessage')
const messagesPool = document.querySelector('.messagesPool')

function getCurrentTime() {
  const timePast = Date.now()
  const todayDate = new Date(timePast)
  const today = todayDate.toLocaleDateString()
  const time = new Date()
  const uyTime = time.toLocaleTimeString('es-UY')
  return {
    today,
    uyTime
  }
}

function postMessage2() {  
  try {
    const email = chatUserEmail.value
    const message = chatUserMessage.value
    const date = `${getCurrentTime().today} - ${getCurrentTime().uyTime}`
    const messageObject = { email, date, message }

    socket.emit('client:sendMessages', messageObject)

  } catch(err) {
    console.log(`There was an error retrieving the messages, error: ${err}`)
  }
}

formMessages.addEventListener('submit', (e) => {
  e.preventDefault()
  postMessage2()
  formMessages.reset()
})

async function renderMessages(messages) {
    try {
    const html = messages.map((messageInfo) => {
      return `<div>
                <strong>${messageInfo.email}</strong>
                [<span>${messageInfo.date}</span>]:
                <em>${messageInfo.message}</em> 
              </div>`
    })
    .join(' ')

    messagesPool.innerHTML = html
  } catch(err) {
    console.log(`There was an error retrieving the messages, error: ${err}`)
  }
}

socket.on('server:sendMessages', (messages) => {
  renderMessages(messages)
})
