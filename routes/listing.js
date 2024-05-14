const express=require("express");
const router=express.Router();
const Listings=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema}=require("../schema.js")

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
router.get("/",wrapAsync(async(req,res)=>{
    const allListings= await Listings.find({})
    res.render("listings/index.ejs",{allListings})
}))
//NEW route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
})
//Create ROUTE
router.post(
    "/",
    validateListing,
   wrapAsync(async (req,res,next)=>{
    const newListing=new Listings(req.body.listing);
    await newListing.save()
    res.redirect("/listings")
}))
//show route  (read)
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listings.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}))
//edit route
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listings.findById(id);
    res.render("listings/edit.ejs",{listing})
}))
//UPDATE ROUTE
router.put("/:id",
 validateListing,
 wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listings.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
}))
//delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let deletedList=await Listings.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings")
}))
module.exports=router;