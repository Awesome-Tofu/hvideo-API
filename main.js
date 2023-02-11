import express from 'express';
const app=express(); 
const port= 9000;

app.use("/",(req,res)=>{
    res.json({"greet":"hello"})
})


app.listen(9000,()=>{
    console.log(`starting server on http://localhost:${port}`);
})