const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
// const { listingSchema } = require("../schema");
const listingSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
       type:Schema.Types.ObjectId,
        ref:"User",
    }
})
listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
const Listings=mongoose.model("Listing",listingSchema);
module.exports=Listings;
