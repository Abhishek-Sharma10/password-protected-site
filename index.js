import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url';
const __filename = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 5000;
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

app.get('/api/health',(req,res)=>{
    res.json({status:'online',provider:'Abhishek-Sharma10',models:GROQ_MODELS});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});