const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
}) 
const storage = new CloudinaryStorage({// here we wre tryin to create a folder on cloudinary for us to store our info
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust-DEV',//wanderlust-dev this will be the folder's name on cloundinary to store the info
    allowedFormat:["png","jpeg","jpg"] // supports promises as well, in this mentioned formats the info is allowed
  },
});
module.exports={cloudinary,storage}