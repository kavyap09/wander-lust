const express=require("express");
const router=express.Router();
const Listings=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema}=require("../schema.js")
const {isLoggedin,isOwner}=require("../middleware.js")

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

//index route
router.get("/",wrapAsync(index))//check controllers-listing.js for the functionalities
//NEW route
router.get("/new",isLoggedin,renderNewform)
//Create ROUTE
router.post(
    "/",
    isLoggedin,isOwner,validateListing,
     wrapAsync(newListing))

//show route  (read)
router.get("/:id",wrapAsync(showListing))

//edit route
router.get("/:id/edit",
isLoggedin,isOwner,
wrapAsync(renderEditform))

//UPDATE ROUTE
router.put("/:id",
isLoggedin,validateListing,
 wrapAsync(updateListing))

//delete route
router.delete("/:id",
    isLoggedin,isOwner,
    wrapAsync(deleteListing))

module.exports=router;