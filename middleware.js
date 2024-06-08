module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.flash("error","Please login to Wanderlust");
    return res.redirect("/login")
}
next();
}