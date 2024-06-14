const Listings=require('./models/listing.js')
const Review = require("./models/review.js"); 

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
    //redirectUrl
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","Please login to Wanderlust");
    return res.redirect("/login")
}
next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if( req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listings.findById(id)
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
       req.flash("error","You don't have the access to update the listing!");
       return res.redirect(`/listings/${id}`)
    }
    next()
}
module.exports.isAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId)
    if(!review.author._id.equals(res.locals.currentUser._id)){
       req.flash("error","You don't have the access to this review");
       return res.redirect(`/listings/${id}`)
    }
    next()
}