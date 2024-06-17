const express=require("express");
const router=express.Router();
const Listings=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema}=require("../schema.js")
const {isLoggedin,isOwner}=require("../middleware.js")
const multer=require("multer")
const {storage}=require("../cloudConfig.js")
const upload=multer({dest:storage})
const {index,renderNewform,newListing,showListing,renderEditform,updateListing,deleteListing}=require("../controllers/listing.js")

const validateListing =(req,res,next)=>{
    let result =listingSchema.validate(req.body);
    if(result.error){
       throw new ExpressError(400,result.error)//result.error
    }
    else{
        next()
    }
}
//check controllers-listing.js for the functionalities
router
.route("/")
//index route
.get(wrapAsync(index))
//create route
// .post(          
//     isLoggedin,
//     validateListing,
//      wrapAsync(newListing)
//     )
.post(upload.single('listing[image]'),(req,res)=>
res.send(req.file)
)
//NEW route
router.get("/new",isLoggedin,renderNewform)
//Create ROUTE

//show route  (read)
router.get("/:id",wrapAsync(showListing))

//edit route
router.get("/:id/edit",
isLoggedin,isOwner,
wrapAsync(renderEditform))

//UPDATE ROUTE
router.route("/id")
.put(
isLoggedin,validateListing,
 wrapAsync(updateListing))
//delete route
.delete(
    isLoggedin,isOwner,
    wrapAsync(deleteListing))

module.exports=router;