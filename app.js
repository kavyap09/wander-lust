const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOveerride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")


const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/reviews.js")
const userRouter=require("./routes/user.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOveerride("_method"));
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

//session
const sessionOptions={
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
};
app.use(session(sessionOptions))
app.use(flash())
//flash

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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
//flash messages
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.del=req.flash("del");
    next();
});
app.use((req,res,next)=>{
    res.locals.error=req.flash("error");
    next();
})
//THIS WORK WE WILL DIRECTLY DO IN POST ROUTE 
// app.get("/registerUser",async (req,res)=>{
//  let fakeUser=new User({
//     email:"stu@mail.com",
//     username:"deltaStudent"
//  });
//  let regUser=await User.register(fakeUser,"helloworld")
//  res.send(regUser);
// })
//routes
app.use("/listings",listingRouter);
app.use("/listings",reviewRouter);
app.use("/",userRouter)
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