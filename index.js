import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url';
const __filename = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;
const hostname = '127.0.0.1';
var userIsAuthorised = false;

app.use(express.urlencoded({extended:true}));

function passwordCheck(req,res,next){
    if(req.body["password"]==="ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

app.get("/",(req,res)=>{
    res.sendFile(__filename+"/public/index.html");
})

app.post("/check",(req,res)=>{
    if(userIsAuthorised){
        res.sendFile(__filename+"/public/secret.html");
    } else {
        res.sendFile(__filename+"/public/index.html");
    }
    
})

app.listen(port,hostname, ()=>{
    console.log(`server running at https://${hostname}:${port}/`);
})