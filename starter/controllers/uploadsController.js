const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { CustomAPIError,UnauthenticatedError,NotFoundError,BadRequestError, } = require('../errors')
const cloudinary = require('cloudinary').v2


//storing image on our own server:
const uploadProductImageLocal = async(req,res) => {
    //check if file exists
    if(!req.files) {
        throw new BadRequestError('No file uploaded');
    }
    console.log(req.files)
    const productImage = req.files.image;

    //check file format
    if(!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Please upload an image')
    }
    //check size
    const maxSize = 1000*1000 //in bytes (1 mega byte)
    if(productImage.size > maxSize) {
        throw new BadRequestError('Please upload image smaller than 1mb')
    }

    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath); //mv func moves the image to assets/pulic > uploads folder
    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
}
//now u can access the image on server by link '{{url}}/uploads/imagename'

//storing image on cloudinary server:
const uploadProductImage = async(req,res) => {
    //console.log(req.files.image) //image is stored in tmp folder on our server
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {use_filename:true,folder:'file-upload'}
    );
    console.log(result); //image is stored in cloudinary > file-upload
    fs.unlinkSync(req.files.image.tempFilePath); //this removes the unwanted tmp files in our server
    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}});
}
module.exports = { uploadProductImage, uploadProductImageLocal};

