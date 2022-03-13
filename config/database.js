const mongoose = require('mongoose');

mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => { 
    console.log('Error trying to connect to mongoDB')
});

const db = mongoose.connection

db.on('connected', () => { console.log(`Connected to MongoDB`) });