import {useState} from 'react';
import {db} from '../config.js';
import {collection, addDoc, Timestamp} from 'firebase/firestore';

const requestTemplate = {
  "title": "",
  "desc": "",
  "requester": "",
  "status": null,
  "priority": "",
  "time": null
};

const PostRequest = () => {
  // const [req, setReq] = useState(requestTemplate);

  // const handleChange = ({target}) => {
  //   setReq({
  //     ...req,
      
  //   });
  // };
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'borrow-requests'), {
        title: title,
        desc: desc,
        location: location,
        requester: "sudoUser",//replace with auth user
        posted: Timestamp.now(),
        priority: priority,
        status: 0
      })
      // onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Enter task decription'
          value={desc}></textarea>
        <input 
          type='text' 
          name='location' 
          onChange={(e) => setLocation(e.target.value)} 
          value={location}
          placeholder='Enter location'/>
        <input 
          type='text' 
          name='priority' 
          onChange={(e) => setPriority(e.target.value)} 
          value={priority}
          placeholder='enter priority'/>
        <button type='submit'>Done</button>
      </form> 
    </div>
  );
}


export default PostRequest;