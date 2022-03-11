const mongoose = require('mongoose');

console.log('URL: ', process.env.dbURL);
mongoose.connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB`);
})