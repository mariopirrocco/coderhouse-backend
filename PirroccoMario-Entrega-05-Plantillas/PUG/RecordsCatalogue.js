class RecordsCatalogue{
  constructor(){
    this.catalogue= [];
  }
  
  getAll(){
    return this.catalogue
  }
  
  newRecord(artist, title, price, thumbnail) {
    try {
      if(this.catalogue.length === 0){        
        const record = {
          artist,
          title,
          price,
          thumbnail,
          id:1
        }
        this.catalogue.push(record)
        return record
      } else {                
        const lastIndex = this.catalogue[this.catalogue.length - 1].id
        const index = lastIndex + 1
        const record = {
          artist,
          title,
          price,
          thumbnail,
          id:index
        }
        this.catalogue.push(record)
        return record
      }
    } catch(err) {
      console.log('There was an erro with the server, error: ' + err)
    }
  }
}

module.exports = RecordsCatalogue