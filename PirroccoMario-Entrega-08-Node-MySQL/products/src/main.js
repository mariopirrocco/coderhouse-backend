import { ContenedorSQL } from './container/ContenedorSQL.js'

const apiRecords = new ContenedorSQL('records')
// const apiRecords = new ContenedorSQL('mensajeria')

async function main() {
  const recordsList = [
    { artist: 'Rolling Stones', 
      record: 'Steel Wheels', 
      price: 32,
      format: 'cd', 
      image: 'https://upload.wikimedia.org/wikipedia/en/2/24/SteelWheels89.jpg' 
    },
    { artist: 'Miss Nine', 
      record: 'Yoshitoshi Ibiza', 
      price: 20,
      format: 'cd', 
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music/7f/11/47/mzi.mmthmhqv.jpg/600x600bf-60.jpg' 
    },
    { artist: 'Sasha', 
      record: 'Global Underground 013 - Ibiza', 
      price: 32,
      format: 'cd', 
      image: 'https://i1.sndcdn.com/artworks-000020853896-hbibq1-t500x500.jpg' 
    },

  ]

  let res  
  res = await apiRecords.insert(recordsList)
  console.log(res)

  res = await apiRecords.list(2)
  console.log('-- Searched record', res)

  await apiRecords.update(3, { price: 50})
  res = await apiRecords.list(3)
  console.log('-- Updated price', res)

  await apiRecords.delete(1)
  res = await apiRecords.listAll()
  console.log('-- Updated catalogue list', res)


  await apiRecords.closeConnection()

}

main()