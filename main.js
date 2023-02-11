import express from 'express';
const app=express(); 
const port= 9000;

app.use("/status",(req,res)=>{
    res.json({"status":"Running..."})
})


app.listen(9000,()=>{
    console.log(`starting server on http://localhost:${port}`);
})