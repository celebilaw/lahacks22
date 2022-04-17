import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../config.js';
import "./HomePage.css";
import Request from "./Request";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ULegend from "./icons/urgency_legend.svg";
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import landmarks from "./places.js"
import '@fontsource/lato';

function HomePage(props) {
  if (!landmarks.includes("")) {
    landmarks.push("");
  }

  const [show, setShow] = useState(false);
  const [locFilter, setLocFilter] = useState("");

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
    res.data.requester, res.data.location, date, res.id]);
  }

  const makeTask = (res) => {
    taskAssembly(res);
    handleClickShow();
    convertDate(formatDate(res.data.posted)); // need to fix
  }

  const cancelRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await deleteDoc(docRef);
    props.fetchData();
    // window.location.reload(true);
  }

  const acceptRequest = async (id) => {
    console.log("accept");
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 1
    });

    // document.getElementById("request-info-popup").classList.toggle("show");
    props.fetchData();
    setShow(false);
  }

  const completeRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    await updateDoc(docRef, {
      status: 2
    });
    props.fetchData();
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  useEffect(() => {
    props.fetchData();
  }, []);

  return (
    <div className="HomeContainer">
      <div className="LeftSide">
        <h1>Current<br />Requests</h1>
        <img src={ULegend} alt="Urgency Legend" width="100%" />
        <br /><br />
        <TextField
          id="LocationFilter"
          value={locFilter}
          onChange={(e) => { setLocFilter(e.target.value) }}
          select
          label="Location Filter"
          sx={{ "width": "100%" }}>
          {landmarks.map(place => <MenuItem value={place} key={place}>{place === "" ? "Clear Filter" : place}</MenuItem>)}
        </TextField>
      </div>

      <div className="RightSide">
        <div className="RequestCards">
          {props.borrowReqs.map((req) => {
            if (locFilter === "" || locFilter === req.data.location) {
              return <Request
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
            }
          })}
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
                <br />
                <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
                  Location : {taskInfo[3]}
                </DialogContentText>
                <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
                  Posted : {taskInfo[4]}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className="dialogName" sx={{ fontWeight: "bold", fontSize: 20 }} style={{ backgroundColor: "#FFDE7C" }} onClick={() => { acceptRequest(taskInfo[5]) }}>Accept</Button>
              </DialogActions>
            </Dialog>
          }

        </div>
      </div>
    </div>
  );
}

export default HomePage;