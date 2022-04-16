import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
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
  }
  
  const makeTask = (res) => {
    handleClickShow();
    taskAssembly(res);
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
      <div id="HomeWrapper" className="RequestCards">
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
          onClick={() => makeTask(req)}
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
