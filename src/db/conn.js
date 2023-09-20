import mysql from "mysql";
export const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mynodejs"
});
con.connect((e)=>{
    if(e){throw e}
    console.log("Connected");
});