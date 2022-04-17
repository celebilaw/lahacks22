import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

  const [taskInfo, setTaskInfo] = useState([]);
  const [date, convertDate] = useState("");

  const taskAssembly = (res) => {
    setTaskInfo([res.data.item, res.data.description, 
      res.data.requester, res.data.location, date, res.id])
  }

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
    taskAssembly(res);
    handleClickShow();
    convertDate(formatDate(res.data.posted)); // need to fix
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

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
        <Dialog open={show} onClose={handleClickClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: "bold", fontSize: 35 }}>
            <span className="dialogTitle">
              {taskInfo[0]}
            </span>
            &nbsp;-&nbsp;
            <span className="dialogName">
              {taskInfo[2]}
            </span> 
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: 25 }}>
              {taskInfo[1]}
            </DialogContentText>
            <br />
            <br/>
            <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
              Location : {taskInfo[3]}
            </DialogContentText>
            <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
              Posted : {taskInfo[4]}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="dialogName" sx={{ fontWeight: "bold", fontSize: 20 }} style={{backgroundColor: "#FFDE7C"}} onClick={acceptRequest(taskInfo[5])}>Accept</Button>
          </DialogActions>
        </Dialog>
      }
      </div>
    </div>
  );
}

export default HomePage;