// const express = require("express");
// const app = express();
// const cors = require("cors")
// const port = 5000

// app.use(cors(
//     {
//   origin: "http://127.0.0.1:5500", // your frontend origin
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]

//     }
// ))

// app.get("/", (req, res)=>{
//     res.send("you are at home");
// })

// app.get("/v1", (req, res)=>{
//     res.send("you are at v1");
// })

// app.get("/v1/b1", (req, res)=>{
//     res.status(200).send("you are at b2 which is ubder v1");
// })


// app.get("/v1/b1/:id", (req, res)=>{
//     const myparam= req.params;
//    const myheader = req.headers;
//    const v= "vishal baba jinda bad"
//    res.status(200).send( {
//         myparam:myparam,
//         myheader:myheader,
//         v:v
//     })
// })


// app.listen(port , ()=>{
//    console.log( `App is running on port ${port}`)
// })



const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000
  

app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
    

}))

app.get("/kalu",(req, res)=>{
   res.status(200).send(`<h2>u are at kalu page</h2>`)
})

app.listen(port, ()=>{
    console.log(`app is runnning on port ${port}
        http://localhost:5000/`);
})