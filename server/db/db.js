const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

module.exports = 
   mongoose.connect('mongodb+srv://admin:admin@cluster0.vk7vn.mongodb.net/cinehome-naira?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    keepAlive: true
})
.then(db => {
    return console.log('Data Base Connected, Yeii!')
})
.catch(e => console.log('Opps, Error', e))
