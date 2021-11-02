const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@codechallenge.lputd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const Schema = mongoose.Schema

const wishSchema = new Schema({

    uname:String,
    wname:String,
    email:String,

});

var wishdata = mongoose.model('wishdata',wishSchema);

module.exports =wishdata;