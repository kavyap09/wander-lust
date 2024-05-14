const express=require("express");
const router=express.Router();
const Listings=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
 const {reviewSchema}=require("./schema.js");
 const Review = require("../models/review.js"); 

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
router.post("/",
    validateReview,
    wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listings.findById(id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save()
    res.redirect(`/listings/${id}`)
}))
//delete review route
router.delete("/:reviewId",wrapAsync(async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    let delReview=await Review.findByIdAndDelete(reviewId)
    console.log(delReview);
    // res.redirect(`/listings`)
}))
module.exports=router;