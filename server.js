const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const { pool } = require('./dbConfig');

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));


app.get("/", (req, res)=>{
     res.render("index");
    // res.send("Hellow");
});

app.get("/users/register", (req, res)=>{
    res.render("register");
})

app.get("/users/login", (req, res)=>{
    res.render("login");
})

app.get("/users/dashboard", (req, res)=>{
    res.render("dashboard", {user: "GUTO"});
})

app.post('/users/register', async (req,res)=>{
  let {name ,email, password, password2} = req.body;
  console.log({name,email,password,password2});

  let errors = [];

  if(!name || !email || !password || !password2){
      errors.push({message: "Por Favor preencha os campos"});
  }

  if(password.length < 6){
      errors.push({message:"A senha deve ter pelo menos 8 caracteres"});
  }

  if(password !== password2){
      errors.push({message:"As senhas não estão iguais"});
  }

  if(errors.length > 0){
      res.render('register', { errors });
  }else{
      //Validação do Form

      let hashedPassword = await bcrypt.hash(password, 10);
    
    pool.query(
      `SELECT * FROM register`
    )
  }
});
app.listen(PORT, ()=>{
    console.log(`Server runing on port ${PORT}`);
})
