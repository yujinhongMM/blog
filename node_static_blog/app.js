const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use("/", express.static('app_blog/build'));

app.get("/*", (req, res) => {
    fs.readFile('app_blog/build/index.html','utf-8',(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`)
})