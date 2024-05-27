const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'student'
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.get('/', (req, res) => {
  return res.json("From BackEnd side");
});

app.get('/students_details', (req, res) => {
  const sql = "SELECT * FROM students_details";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/students_details', (req, res) => {
  const { student_name, Student_branch, Student_email, Student_password } = req.body;
  const sql = `INSERT INTO students_details (student_name, Student_branch, Student_email, Student_password) VALUES (?, ?, ?, ?)`;
  const values = [student_name, Student_branch, Student_email, Student_password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting new student:", err);
      return res.status(500).json({ error: "An error occurred while inserting new student" });
    }
    console.log("New student inserted successfully");
    return res.json({ message: "New student inserted successfully" });
  });
});

app.put('/students_details', (req, res) => {
  // const { student_name, Student_branch, Student_email, Student_password } = req.body;
  console.log("Received data:", req.body);
  console.log("********"); 
  console.log(req.body[0].student_name);
 
  try {
    (req.body).forEach((item) => {
      const { student_name, Student_branch, Student_email, Student_password } = item;
      db.query(
        "UPDATE students_details SET student_name = ?, Student_branch = ?, Student_password = ? WHERE Student_email = ?",
        [student_name, Student_branch, Student_password, Student_email],
        (err, result) => {
          if (err) {
            console.error("Error updating student details:", err);            
          }          
          // console.log("Number of rows affected:", result.affectedRows);          
        }
      );

    })
    return res.json({ message: "Student details updated successfully" });
  }
  catch(err) {
    return res.status(500).json({ error: "An error occurred while updating student details" });
  }
    
  
});


  app.delete('/students_details/:Student_email', (req, res) => {
    const { Student_email } = req.params;
    console.log("#########");
    console.log(Student_email);  
    console.log("Received data:", req.body);
    db.query(
      "DELETE FROM students_details WHERE Student_email = ?",
      [Student_email],
      (err, result) => {
        if (err) {
          console.error("Error deleting student:", err);
          return res.status(500).json({ error: "An error occurred while deleting student" });
        }
        console.log("Student deleted successfully");
        return res.json({ message: "Student deleted successfully" });
      }
    );
  });
  
  


app.listen(8081, () => {
  console.log("Listening on port 8081");
});
