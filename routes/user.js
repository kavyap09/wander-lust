const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js")
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware.js");

const {renderSignup,signUp,renderLogin,Login,Logout}=require("../controllers/user.js")

router.get("/signup",(renderSignup))

router.post("/signup",wrapAsync(signUp))

router.get("/login",renderLogin)

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
  Login
);

router.get("/logout",Logout)
module.exports=router;