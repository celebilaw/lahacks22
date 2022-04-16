import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import {db} from '../config.js';
import "./HomePage.css";
import Request from "./Request";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function HomePage() {
  
  const [borrowReqs, setBorrowReqs] = useState([]);
  const [show, setShow] = React.useState(false);

  const handleClickShow = () => {
    setShow(true);
  }

  const handleClickClose = () => {
    setShow(false);
  }

  let taskInfo = []

  const taskAssembly = (res) => {
    taskInfo.push(res.data.title);
    taskInfo.push(res.data.desc);
    taskInfo.push(res.data.requester);
    taskInfo.push(res.data.priority);
    taskInfo.push(res.data.location);

  const cancelRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await deleteDoc(docRef);
  }

  const acceptRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 1
    });
  }

  const completeRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 2
    });
  }
  
  const makeTask = (res) => {
    handleClickShow();
    taskAssembly(res);
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
          onClick={() => makeTask(req)}
          cancelRequest={cancelRequest}
          acceptRequest={acceptRequest}
          completeRequest={completeRequest}
        />
      ))}
      {show && 
        <Dialog>
          <DialogTitle>
            {taskInfo[0]}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {taskInfo[1]}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Nah</Button>
            <Button onClick={handleClickClose}>Yap</Button>
          </DialogActions>
        </Dialog>
      }
      </div>
    </div>
  );
}

export default HomePage;
