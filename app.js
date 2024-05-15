const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOveerride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")

const listings=require("./routes/listing.js")
const reviews=require("./routes/reviews.js")

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

app.use("/listings",listings);
app.use("/listings",reviews);
// app.use("/listings/:id/reviews",reviews);

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