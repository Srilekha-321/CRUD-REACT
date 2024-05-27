import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [insertMode, setInsertMode] = useState(false);
  const [x , setX] = useState();
  const [newRecord, setNewRecord] = useState({
    student_name: "",
    Student_branch: "",
    Student_email: "",
    Student_password: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8081/students_details')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInsert = () => {
    setInsertMode(true);
  };
const handledeletion=(studentEmail)=>{
  const k=window.confirm('are you sure to delete the data?');
  if(k)
  {
    handleDelete(studentEmail);
  }
  
};
  const handleSave = () => {
    if (editMode) {
      // Send updated data to the server
      fetch('http://localhost:8081/students_details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        // body: JSON.stringify(x)
      })
        .then(response => {
          if (response.ok) {
            console.log('Data updated successfully');
            setEditMode(false);
            setX(null);
            // console.log(data);
            fetchData(); // Refresh data after update
          } else {
            console.error('Failed to update data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else if (insertMode) {
      // Send new record to the server for insertion
      fetch('http://localhost:8081/students_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify(newRecord)
      })
        .then(response => {
          if (response.ok) {
            alert('Data Inserted');
            console.log('Data inserted successfully');
            console.log(newRecord);
            setInsertMode(false);
            fetchData(); // Refresh data after insertion
          } else {
            console.error('Failed to insert data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };
 
  const handleDelete = (studentEmail) => {

    fetch(`http://localhost:8081/students_details/${studentEmail}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert('are you sure to delete the data');

          console.log('Student deleted successfully');
          fetchData(); // Refresh data after deletion
        } else {
          console.error('Failed to delete student');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const handleInputChange = (e, index, key) => {
    const newData = [...data];
    newData[index][key] = e.target.value;
    setData(newData);
  };

  const handleNewRecordChange = (e, key) => {
    const value = e.target.value;
    setNewRecord(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial, sans-serif" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <h1 style={{textAlign:"center"}}>CRUD operations Using React</h1>
          <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Branch</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Password</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {editMode ? (
                      <input
                        type="text"
                        value={d.student_name}
                        onChange={(e) => handleInputChange(e, i, 'student_name')}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      d.student_name
                    )}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {editMode ? (
                      <input
                        type="text"
                        value={d.Student_branch}
                        onChange={(e) => handleInputChange(e, i, 'Student_branch')}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      d.Student_branch
                    )}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {editMode ? (
                      <input
                        type="text"
                        value={d.Student_email}
                        onChange={(e) => handleInputChange(e, i, 'Student_email')}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      d.Student_email
                    )}
                    
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {editMode ? (
                      <input
                        type="password"
                        value={d.Student_password}
                        onChange={(e) => handleInputChange(e, i, 'Student_password')}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      d.Student_password
                    )}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    { d.Student_email ? (
                      <button onClick={() => handledeletion(d.Student_email)}>Delete</button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
              {insertMode && (
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <input
                      type="text"
                      value={newRecord.student_name}
                      onChange={(e) => handleNewRecordChange(e, 'student_name')}
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <input
                      type="text"
                      value={newRecord.Student_branch}
                      onChange={(e) => handleNewRecordChange(e, 'Student_branch')}
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <input
                      type="text"
                      value={newRecord.Student_email}
                      onChange={(e) => handleNewRecordChange(e, 'Student_email')}
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <input
                      type="password"
                      value={newRecord.Student_password}
                      onChange={(e) => handleNewRecordChange(e, 'Student_password')}
                      style={{ width: "100%" }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {editMode ||insertMode  ? (
            <button style={{ marginTop: "20px", padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleSave}>Save Changes</button>
          ) : (
            <>
              <button style={{ marginTop: "20px", marginRight: "10px", padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleEdit}>Edit Data</button>
              <button style={{ marginTop: "20px", padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleInsert}>Insert Data</button>
            </>
          )}
        </>
      )}
  

    </div>
  );
    
}

export default App;