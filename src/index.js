import express from "express";
const app = express();
import { con } from "./db/conn.js";
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/api", (req, res) => {
    try{
        con.query("select * from students", (err, result) => {
            if (err) {
                res.status(400).send({ error: "Bad Request" });
            }
            if (result != "") {
                res.send(result);
            }
            else {
                res.status(404).send({ error: "Not Found" });
            }
        });
    }catch(e){
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.get("/api/:id", (req, res) => {
    try {
        con.query("select * from students where ID=?", [req.params.id], (err, result) => {
            if (err) {
                res.status(400).send({ error: "Bad Request" });
            }
            if (result != "") {
                res.send(result);
            }
            else {
                res.status(404).send({ error: "Not Found" });
            }
        });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.post("/api", (req, res) => {
    try {
        const value = req.body;
        const insertData = [value.Name, value.Email, value.Phone, value.City]
        con.query("insert into students(Name,Email,Phone,City) values(?)", [insertData], (err, result) => {
            if (err) {
                res.status(400).send({ error: "Bad Request" });
            }
            res.status(201).send({ message: "register successfully" });
        });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.patch("/api/:id", (req, res) => {
    try {
        const uData=req.body;
        con.query("update students set Email=? where ID="+req.params.id,[uData.Email], (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send({ error: "Bad Request" });
            }
            if (result.affectedRows == 0) {
                res.status(404).send({ error: "Not Found" });
            }
            else {
                res.send({message:result.message});
            }
        })
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.delete("/api/:id", (req, res) => {
    try{
        con.query("delete from students where ID=?",[req.params.id],(err, result) => {
            if (err) {
                res.status(400).send({ error: "Bad Request" });
            }
            if (result.affectedRows == 0) {
                res.status(404).send({ error: "Not Found" });
            }
            else {
                res.send(result);
            }
        });
    }catch(e){
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});