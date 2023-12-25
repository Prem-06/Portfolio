const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/portfolioMessage').then(()=>{
    console.log('connected to database:coustmerdata')
}).catch(()=>{
    console.log('Error not connected to database')
});

const Message=new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    rating:Number,
   })
   const onlinemessage=mongoose.model('Onlinemessage',Message);
   app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/message',(req,res)=>{
    const val=req.body;
    onlinemessage.insertMany({name:val.name,email:val.email,message:val.message,rating:val.rating}).then(()=>{
        res.status(200).sendFile(__dirname+'/datasubmitted.html');
    }).catch((err)=>{
        res.status(500).sendFile(__dirname+'datanotsubmitted.html');
    })
    
 })
 app.listen(3000,(req,res)=>{
    console.log('server is running on 127.0.0.1:3000');
    let url="http://localhost:3000";
    console.log("click on link:" + url);
});