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