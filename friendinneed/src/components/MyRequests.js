import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db, auth } from '../config';
import Request from './Request';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import "../css/MyRequests.css";

const MyRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [myAcceptedRequests, setMyAcceptedRequests] = useState([]);
  const user = auth.currentUser;
  // console.log(user);

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

  useEffect(() => {
    if (user) { //doesn't work
      fetchPendingRequestsForUser();
      fetchAcceptedRequestsForUser();
      fetchMyAcceptedRequestsForUser();
    }
  }, [user]);


  return(
    <Box>
      <Stack spacing={2}>
        <div className="tasksSection">
          <h1>My Accepted Requests</h1>
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
              // onClick={() => makeTask(req)}
              // cancelRequest={cancelRequest}
              // acceptRequest={acceptRequest}
              // completeRequest={completeRequest}
            />
          ))}
        </div>
        <div className="tasksSection">
          <h1>Requests Accepted By Ucla Peeps :)</h1>
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
              // onClick={() => makeTask(req)}
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
              // onClick={() => makeTask(req)}
              // cancelRequest={cancelRequest}
              // acceptRequest={acceptRequest}
              // completeRequest={completeRequest}
            />
          ))}
        </div>
      </Stack>
    </Box>
  );
};

export default MyRequests;