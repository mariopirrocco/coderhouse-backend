const socket = io()

const formProductos = document.querySelector('.form-records')
const formArtist = document.querySelector('#artist')
const formTitle = document.querySelector('#title')
const formPrice = document.querySelector('#price')
const formThumbnail = document.querySelector('#thumbnail')
const productsPool = document.querySelector('.productsPool')
const noProducts = document.querySelector('.noProducts')
const yesProducts = document.querySelector('.yesProducts')

/*-------- Records management --------*/
function postProduct() {
  try {
    const artist = formArtist.value
    const title = formTitle.value
    const price = formPrice.value
    const thumbnail = formThumbnail.value

    const recordObject = { artist, title, price, thumbnail }
    socket.emit('client:envioproduct', recordObject)

  } catch(err) {
    console.log(`There was an error: ${err}`)
  }
}

async function renderProduct(data) {
  try {
    const response = await fetch('/template.hbs')
    const templateHbs = await response.text()

    productsPool.innerHTML = '';
    if (data.length > 0) {
      yesProducts.style.display = '';
      noProducts.style.display = 'none';
      data.forEach((product) => {
        const template = Handlebars.compile(templateHbs);
        const html = template(product);
        productsPool.innerHTML += html;
      });
    } else {
      yesProducts.style.display = 'none'
      noProducts.style.display = ''
    }
  } catch(err) {
    console.log(`There was an error loading the catalogue, error: ${err}`)
  }
}

formProductos.addEventListener('submit', (e) => {
  e.preventDefault()
  postProduct()
  formProductos.reset()
})

socket.on('server:envioproductos', (data) => {
  renderProduct(data)
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

    socket.emit('client:enviomessage', messageObject)

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
              <strong style="color: blue;" >${messageInfo.email}</strong>[
              <span style="color: brown;">${messageInfo.date}</span>]:
              <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`
    })
    .join(' ')

    messagesPool.innerHTML = html
  } catch(err) {
    console.log(`There was an error retrieving the messages, error: ${err}`)
  }
}

socket.on('server:enviomessages', (messages) => {
  renderMessages(messages)
})
