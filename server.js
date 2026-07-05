const express=require("express");
const app=express();
app.use(express.json());
app.use(express.static(__dirname));

let trips=[];
app.get("/trip",function(req,res){

res.json(trips);
});
app.post("/trip",function(req,res){
trips.push(req.body);
res.json({
msg:"Trip Saved"
});
});
const PORT=process.env.PORT||3000;
app.listen(PORT,function(){
    console.log("Server Running");
});