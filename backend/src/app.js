const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser= require("body-parser")
const port = 5000;
app.use(express.json()); 
//post request
const userData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 25,
    role: "Admin",
    isActive: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    age: 30,
    role: "User",
    isActive: false,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 28,
    role: "Moderator",
    isActive: true,
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    age: 32,
    role: "User",
    isActive: true,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    age: 27,
    role: "User",
    isActive: false,
  },
]; 

app.use(
  cors({
    origin: "*", // your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.send("you are at home");
});

//get request
app.get("/user/1", (req, res) => {
  res.status(200).send({
    username: "vishal prajapati",
    age: 25,
  });
});



//post request
app.post("/user", (req, res) => {
 
  const user = req.body;
     console.log(user);
  
  if (!user) {
    res.status(402)
      .send(
      "please entre valid user");
  }

  const newuser ={
    id: user.id,
    name: user.name,
    email: user.email,
    age: user.age,
    role: user.role,
    isActive:user.isActive
  }

  console.log(newuser);

  userData.push(newuser);
  userData.map((e)=>{
    console.log(e)
  })
return res.status(201).send({message: "user Created succesfullly"})
  
});

 //put
  app.put("/user", (req, res)=>{
    const user = req.body;
    console.log(`User details ${{user}}`)
    const userid= user.id
      const currentUser= userData.find((curentUser)=> curentUser.id ==userid  );
      currentUser.age= user.age;
      currentUser.email= user.email;
      currentUser.name= user.name;
      currentUser.role= user.role;
      currentUser.isActive= user.isActive;
     console.log(` currentUser Details ${{currentUser}}`);
     console.log("user Data array")
      userData.map((e)=>{
    console.log(e)
  })
    res.status(200).send({currentUser});
        
  })




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

app.listen(port, () => {
  console.log(`App is running on port ${port}   http://localhost:5000/`);
});
