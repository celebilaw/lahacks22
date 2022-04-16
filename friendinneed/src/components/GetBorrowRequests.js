import {useState, useEffect} from 'react';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from '../config.js';
import Request from './Request.js';
import PostRequest from './PostRequest.js';

const BorrowRequests = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [borrowReqs, setBorrowReqs] = useState([])

  useEffect(() => {
    const borrowRequestsRef = query(collection(db, 'borrow-requests'), orderBy('status', 'priority'))
    onSnapshot(borrowRequestsRef, (snapshot) => {
      setBorrowReqs(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div>
      <p>hi</p>
      <PostRequest />
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
  );
}

export default BorrowRequests;