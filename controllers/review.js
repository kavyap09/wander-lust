const Review = require("../models/review.js"); 
const Listings=require("../models/listing.js")

module.exports.newReview=(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listings.findById(id);
    if(!listing){
        return res.send("No listings found this this id");
    }
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview)
    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save()
    req.flash("success","New Review Added")
    res.redirect(`/listings/${id}`)
});

module.exports.deleteReview=(async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    let delReview=await Review.findByIdAndDelete(reviewId)
    console.log(delReview);
    req.flash("del","Review Deleted")
    res.redirect(`/listings/${id}`);
})