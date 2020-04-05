const mongoose = require ('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/nov-ticket-master-node',
        { 
          useUnifiedTopology: true, 
          useCreateIndex : true ,
          useNewUrlParser: true
        })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = setupDB