import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import {db} from '../config.js';
import "./HomePage.css"
import Request from "./Request"
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

function HomePage() {

  const [borrowReqs, setBorrowReqs] = useState([]);

  async function fetchData() {
    const q = query(collection(db, "borrowrequests"), where("status", "!=", 2));
    const querySnapshot = await getDocs(q);
    setBorrowReqs(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })));
  }
  
  const cancelRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await deleteDoc(docRef);
    fetchData();
  }

  const acceptRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 1
    });
    fetchData();
  }

  const completeRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 2
    });
    fetchData();
  }

  useEffect(() => {
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
    </div>
  );
}

export default HomePage;
