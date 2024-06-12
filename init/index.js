const mongoose=require("mongoose");
const initData=require("./data.js")
const Listing=require("../models/listing.js");
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

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6661cd50a7c54b5cb800a501'}))//adding owner 
    await Listing.insertMany(initData.data);
    console.log("data intilaized")
}
initDB()