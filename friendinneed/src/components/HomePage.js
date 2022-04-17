import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import {db} from '../config.js';
import "./HomePage.css"
import Request from "./Request"

function HomePage() {

  const [borrowReqs, setBorrowReqs] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "borrowrequests"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
      setBorrowReqs(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="RequestCards">
        <h1>Requests</h1>
        {borrowReqs.map((req) => (
        <Request
          id={req.id}
          key={req.id}
          item={req.data.item} 
          description={req.data.description}
          requester={req.data.requester}
          fulfiller={req.data.fulfiller}
          status={req.data.status}
          urgency={req.data.urgency}
          posted={req.data.posted}
          location={req.data.location}
        />
      ))}
      </div>
    </div>
  );
}

export default HomePage;