import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 

const Record = (props) => (
  //display user info
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.email}</td>
   {props.record.itemsCollected.map(paragraph => <text>{String(paragraph)}</text>)}
   <td>{props.record.chestsOpened}</td>
   <td>
     
     <button className="btn btn-link"
      //make the button delete the record
       onClick={() => { 
         props.deleteRecord(props.record.name);
       }}
     >
       Delete 
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
     //if the response is not successful, throw an error
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
    //if the response is successful, set the records to the response
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(name) {
   //make a delete request to the record url
   await fetch(`http://localhost:5000/${name}`, {
     method: "DELETE"
   });
   //set the records to the new records
   const newRecords = records.filter((el) => el.name !== name);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record.name)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>E-Mail</th>
           <th>ItemsCollected</th>
           <th>ChestsOpened</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}