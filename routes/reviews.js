const express=require("express");
const router=express.Router();
const Listings=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js");
const Review = require("../models/review.js"); 
const {isLoggedin,isAuthor}=require("../middleware.js")

const {newReview,deleteReview}=require("../controllers/review.js")
const validateReview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error)
    }
    else{
        next()
        
    }
} 

//REVIEWS-post
router.post("/:id/reviews",
    isLoggedin,
    validateReview,
    wrapAsync(newReview))
//delete review route
router.delete("/:id/reviews/:reviewId",
   isLoggedin,
   isAuthor,
    wrapAsync(deleteReview))
module.exports=router;