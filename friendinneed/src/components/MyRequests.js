import { collection, doc, updateDoc, deleteDoc, getDocs, query, where, getDoc, increment } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db, auth } from '../config';
import Request from './Request';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import "../css/MyRequests.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const MyRequests = (props) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [myAcceptedRequests, setMyAcceptedRequests] = useState([]);
  const user = auth.currentUser;
  const [show, setShow] = useState(false);

  const handleClickShow = () => {
    setShow(true);
  };

  const handleClickClose = () => {
    setShow(false);
  };

  const [taskInfo, setTaskInfo] = useState({});

  const updateBorrowLend = async (requester, fulfiller) => {
    const requesterRef = doc(db, "user-profiles", requester);
    const fulfillerRef = doc(db, "user-profiles", fulfiller);
    await updateDoc(requesterRef, {
      items_borrowed: increment(1),
    });
    await updateDoc(fulfillerRef, {
      items_lended: increment(1),
    });
  }
  const taskAssembly = (res, type) => {
    setTaskInfo({
      "Item": res.data.item,
      "Description": res.data.description,
      "RequesterName": res.data.requestername,
      "Location": res.data.location,
      "Date": formatDate(res.data.posted.toDate()),
      "Identity": res.id,
      "FulfillerName": res.data.fulfillername,
      "FulfillerEmail": res.data.fulfilleremail,
      "RequesterEmail": res.data.requesteremail,
      "Type": type,
    });
  };

  const makeTask = (res, type) => {
    taskAssembly(res, type);
    handleClickShow();
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const fetchPendingRequestsForUser = async () => {
    const q = query(collection(db, "borrowrequests"), where("status", "==", 0), where("requester", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setPendingRequests(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })));
  };

  const fetchAcceptedRequestsForUser = async () => {
    const q = query(collection(db, "borrowrequests"), where("status", "==", 1), where("requester", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setAcceptedRequests(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })));
  };

  const fetchMyAcceptedRequestsForUser = async () => {
    const q = query(collection(db, "borrowrequests"), where("status", "==", 1), where("fulfiller", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setMyAcceptedRequests(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })));
  };

  const completeRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    const data = await getDoc(docRef);
    updateBorrowLend(data.data().requester, data.data().fulfiller);
    await updateDoc(docRef, {
      status: 2,
    })
    props.fetchData();
    setShow(false);
  };

  const cancelRequest = async (id) => {
    const docRef = doc(db, "borrowrequests", id);
    const docData = await getDoc(docRef);
    if (user.uid === docData.data().requester) {
      await deleteDoc(docRef);
    }
    else {
      await updateDoc(docRef, {
        status: 0,
        fulfiller: '',
        fulfillername: '',
        fulfilleremail: '',
      })
    }
    props.fetchData();
    setShow(false);
  };

  useEffect(() => {
    if (user) { //doesn't work
      fetchPendingRequestsForUser();
      fetchAcceptedRequestsForUser();
      fetchMyAcceptedRequestsForUser();
    }
  }, [user]);


  return (
    <Box>
      <Stack spacing={2}>
        <div className="tasksSection">
          <h1>Requests Assigned To Me</h1>
          {myAcceptedRequests.map((req) => (
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
              onClick={() => makeTask(req, 0)}
            // cancelRequest={cancelRequest}
            // completeRequest={completeRequest}
            />
          ))}
        </div>
        <div className="tasksSection">
          <h1>My In Progress Requests</h1>
          {acceptedRequests.map((req) => (
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
              onClick={() => makeTask(req, 1)}
            // cancelRequest={props.cancelRequest}
            // completeRequest={props.completeRequest}
            />
          ))}
        </div>
        <div className="tasksSection">
          <h1>My Pending Requests</h1>
          {pendingRequests.map((req) => (
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
              onClick={() => makeTask(req, 0)}
            // cancelRequest={cancelRequest}
            // completeRequest={completeRequest}
            />
          ))}
        </div>
      </Stack>
      {show && (
        <Dialog
          open={show}
          onClose={handleClickClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ fontWeight: "bold", fontSize: 35 }}>
            <span className="dialogTitle">{taskInfo["Item"]}</span>
            &nbsp;-&nbsp;
            <span className="dialogName">{taskInfo["RequesterName"]}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: 25 }}>
              {taskInfo["Description"]}
            </DialogContentText>
            <br />
            <br />
            <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
              Location : {taskInfo["Location"]}
            </DialogContentText>
            <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
              Posted : {taskInfo["Date"]}
            </DialogContentText>
            <DialogContentText textAlign="right" sx={{ fontSize: 18 }}>
              Fulfiller : {taskInfo["FulfillerName"]}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="dialogName"
              sx={{ fontWeight: "bold", fontSize: 20 }}
              style={{ backgroundColor: "#FFDE7C" }}
              onClick={() => {
                cancelRequest(taskInfo["Identity"]);
              }}
            >
              Cancel
            </Button>
            {taskInfo["Identity"] === user.uid &&
              <Button
                className="dialogName"
                sx={{ fontWeight: "bold", fontSize: 20 }}
                style={{ backgroundColor: "#FFDE7C" }}
                onClick={() => {
                  completeRequest(taskInfo["Identity"]);
                }}
              >
                Complete
              </Button>
            }
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default MyRequests;