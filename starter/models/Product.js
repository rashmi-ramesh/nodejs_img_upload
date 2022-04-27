const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,//path of the image present in the server
        required:true
    }
});

module.exports = mongoose.model('Product',ProductSchema);