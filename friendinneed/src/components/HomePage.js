import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from '../config.js';
import "./HomePage.css"
import Request from "./Request"

function HomePage() {
  const [borrowReqs, setBorrowReqs] = useState([])

  const cancelRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await deleteDoc(docRef);
    window.location.reload(true);
  }

  const acceptRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 1
    });
    window.location.reload(true);
  }

  const completeRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 2
    });
    window.location.reload(true);
  }

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "borrowrequests"), where("status", "!=", 2));
      const querySnapshot = await getDocs(q);
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
            cancelRequest={cancelRequest}
            acceptRequest={acceptRequest}
            completeRequest={completeRequest}
          />
        ))}
      </div>

      <p>{document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]}</p>
    </div>
  );
}

export default HomePage;
