const User=require("../models/user.js")
module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.signUp=(async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const regUser=await User.register(newUser,password);
    console.log(regUser);
    req.login(regUser,(err)=>{
    if(err){
      return next(err)
    }
    req.flash("success","Welcome to Wanderlust!!")
    res.redirect("/listings")
    })
   }
   catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
   }
})
module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs")
  }
  module.exports.Login=async(req,res)=>{
    req.flash("success","You have logged in to Wanderlust ! Welcome");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
    }
module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
     if(err){
      return next(err)
     }
     req.flash("success","You're logged out now!")
     res.redirect("/listings")
    })
  }