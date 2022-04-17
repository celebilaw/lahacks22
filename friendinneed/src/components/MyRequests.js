import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db, auth } from '../config';
import Request from './Request';


const MyRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [myAcceptedRequests, setMyAcceptedRequests] = useState([]);
  const user = auth.currentUser;
  console.log(user);

  const fetchPendingRequestsForUser = async () => {

    const q = query(collection(db, "borrowrequests"), where("status", "==", 0), where("owner", "==", auth.currentUser.uid)); 
    const querySnapshot = await getDocs(q);
    setPendingRequests(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })));
  };

  const fetchAcceptedRequestsForUser = async () => {
    const q = query(collection(db, "borrowrequests"), where("status", "==", 1), where("owner", "==", auth.currentUser.uid)); 
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
    <div>
      <h1>accepted requests</h1>
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

      <h1>requests accepted by ucla peeps :)</h1>
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
          // cancelRequest={cancelRequest}
          // acceptRequest={acceptRequest}
          // completeRequest={completeRequest}
        />
      ))}
      <h1>pending requests</h1>
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
  );
};

export default MyRequests;