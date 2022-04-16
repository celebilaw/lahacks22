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
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
        {borrowReqs.map((req) => (
        <Request
          id={req.id}
          key={req.id}
          title={req.data.title} 
          desc={req.data.desc}
          requester={req.data.requester}
          fulfiller={req.data.fulfiller}
          status={req.data.status}
          priority={req.data.priority}
          posted={req.data.posted}
          location={req.data.location}
        />
      ))}
      </div>
    </div>
  );
}

export default HomePage;
