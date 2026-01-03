import dotenv from "dotenv";
import mysql from "mysql";
import cors from "cors";
import express, { json } from "express";
import bodyParser from "body-parser";



dotenv.config();
const app = express();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());


//get all users
app.get("/user", (req, res) => {
  const q = "SELECT * FROM user";
  conn.query(q,(err, data)=>{
    if (err) return err;
    res.send(data);
  });
});


//get user by id
app.get("/byid/user_id", (req, res)=>{
    const getid = req.params.user_id;
    const q = "SELECT FROM user WHERE `user_id`=(?)";
    conn.query(q, getid, (err, data)=>{
        if (err) return (err);
        return res.json(data);
    })
})



//create a user
app.post("/user", (req, res) => {
  const q = "INSERT INTO user (`first_name`, `last_name`) VALUES (?)";
  const values = [req.body.first_name, req.body.last_name];
  conn.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("user has been created successfully");
  });
});





app.listen(3000,()=>{
  console.log("connect to backend and server is running");
});
