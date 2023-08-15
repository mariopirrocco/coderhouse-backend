console.log('real time products js loaded')
const socket = io()

const form = document.querySelector('form')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const price = document.querySelector('#price')
const stock = document.querySelector('#stock')
const submit = document.querySelector('#submit')

const content = document.querySelector('#products-list')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  socket.emit('new product', {
    title: title.value,
    description: description.value,
    price: price.value,
    stock: stock.value,
  })
  title.value = ''
  description.value = ''
  price.value = ''
  stock.value = ''
})

socket.on('loaded products', (data) => {
  const products = data.map((prod) => {
    return `
      <tr>
        <td>${prod.title}</td>
        <td>${prod.description}</td>
        <td>${prod.price}</td>
        <td>${prod.stock}</td>
      </tr>
    `
  }).join('')
  
  content.innerHTML = products

})
