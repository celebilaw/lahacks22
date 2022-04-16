import React, { useState } from 'react'
import "./HomePage.css"
import Request from "./Request"
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

function HomePage() {

  let [item, setItem] = useState("");
  let [description, setDescription] = useState("");
  let [urgency, setUrgency] = useState("");
  let [loc, setLoc] = useState("");

  const handleNewRequest = (e) => {
    document.getElementById("request-form").classList.toggle("show");
  }

  const handleItemChange = (e) => {
    setItem(e.target.value);
  }

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  }

  const handleUrgencyChange = (e) => {
    setUrgency(e.target.value);
  }

  const handleLocChange = (e) => {
    setLoc(e.target.value);
  }

  const handleSubmit = (e) => {
    //TODO: Do some checks to ensure no blank fields are submitted
    console.log(item, urgency, loc);

    // Clear form elements when user submits
    setItem("");
    setUrgency("");
    setLoc("");
  
    // Close new request form when user clicks submit
    document.getElementById("request-form").classList.toggle("show");
  }

  const handleCancel = (e) => {
    // Clear form elements when user cancels
    setItem("");
    setUrgency("");
    setLoc("");
    document.getElementById("request-form").classList.toggle("show");
  }

  const urgencies = ["SOS", "Immediate", "Couple Hours", "Days", "Weeks"]
  const landmarks = ["Powell", "YRL", "Sproul", "Delta Terrace", "Sunset Village", "Rieber", "De Neve", "Olympic", "Centennial"].sort() // Sort by alphabetical order

  return (
    <div>
      <Stack
        id="request-form"
        component="form"
        sx={{
          width: '25ch'
        }}
        spacing={0.5}
        noValidate
        autoComplete="off"
        className="RequestForm"
      >
        <TextField label="Item" variant="outlined" value={item} onChange={handleItemChange} />
        <TextField label="Description" variant="outlined" value={description} onChange={handleDescChange} />

        <TextField
          id="UrgencyLabel"
          value={urgency}
          onChange={handleUrgencyChange}
          select
          label="Urgency">
          {urgencies.map(u => <MenuItem value={u} key={u}>{u}</MenuItem>)}
        </TextField>

        <TextField
          id="LocationLabel"
          value={loc}
          onChange={handleLocChange}
          select
          label="Place">
          {landmarks.map(place => <MenuItem value={place} key={place}>{place}</MenuItem>)}
        </TextField>

        <Button onClick={handleSubmit}>Submit Request</Button>
        <Button onClick={handleCancel}>CANCEL</Button>
      </Stack>

      <div className="RequestCards">
        <Button className="AddRequest" id="AddIcon" onClick={handleNewRequest}><AddIcon /></Button>

        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
      </div>
    </div>
  );
}

export default HomePage;
