const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listings=require('./models/listing.js')
const path=require("path");
const methodOveerride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema}=require("./schema.js")
const Review = require("./models/review.js");
const {reviewSchema}=require("./schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOveerride("_method"));
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

main()
.then(()=>{
    console.log("connection successfull")
})
.catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const validateListing =(req,res,next)=>{
    let result =listingSchema.validate(req.body);
    if(result.error){
       throw new ExpressError(400,result.error)//result.error
    }
    else{
        next()
    }
}

const validateReview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error)
    }
    else{
        next()
        
    }
}
//index route
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings= await Listings.find({})
    res.render("listings/index.ejs",{allListings})
}))
//NEW route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})
//Create ROUTE
app.post(
    "/listings",
    validateListing,
   wrapAsync(async (req,res,next)=>{
    const newListing=new Listings(req.body.listing);
    await newListing.save()
    res.redirect("/listings")
}))
//show route  (read)
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listings.findById(id);
    res.render("listings/show.ejs",{listing});
}))
//edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listings.findById(id);
    res.render("listings/edit.ejs",{listing})
}))
//UPDATE ROUTE
app.put("/listings/:id",
 validateListing,
wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listings.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
}))
//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let deletedList=await Listings.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings")
}))
//REVIEWS-post
app.post("/listings/:id/reviews",
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
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found..."));
})
app.use((err,req,res,next)=>{
 let {status=500,message="error "}=err;
res.render("error.ejs",{message})
})
app.get("/",(req,res)=>{
    res.send("helo this is port 8080!")
});
app.listen(8080,()=>{
    console.log("server is listening to port :8080")
})