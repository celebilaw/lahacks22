import {useState, useEffect} from 'react';
// import {doc, collection, query, orderBy, onSnapshot} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../config.js';
import Request from './Request.js';
import PostRequest from './PostRequest.js';

const BorrowRequests = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [borrowReqs, setBorrowReqs] = useState([])

  const cancelRequest = async () => {

  }

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "borrowrequests"), where("status", "!=", 2));
      const querySnapshot = await getDocs(q);
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