const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js")
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware.js");

const {renderSignup,signUp,renderLogin,Login,Logout}=require("../controllers/user.js")
router
.route("/signup")
//gettingsignup page
.get((renderSignup))
//storing signup info
.post(wrapAsync(signUp))

router
.route("/login")
//getting login page
.get(renderLogin)
//storing login info
.post(
  saveRedirectUrl,
  passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
  Login
);

router.get("/logout",Logout)
module.exports=router;