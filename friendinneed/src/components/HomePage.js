import React, { useState } from 'react'
import "./HomePage.css"
import Request from "./Request"
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl } from '@mui/material';

function HomePage() {

  let [item, setItem] = useState("");
  let [urgency, setUrgency] = useState("");
  let [loc, setLoc] = useState("");

  const onClickAddRequest = () => {
    let popup = document.getElementById("request-form");
    popup.classList.toggle("show");
  }

  const handleItemChange = (e) => {
    setItem(e.target.value);
  }

  const handleUrgencyChange = (e) => {
    setUrgency(e.target.value);
  }

  const handleLocChange = (e) => {
    setLoc(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(item, urgency, loc);
    setItem("");
    setUrgency("");
    setLoc("");
  }

  const urgencies = ["SOS", "Immediate", "Couple Hours", "Days", "Weeks"]
  const landmarks = ["Powell", "YRL", "Sproul", "Delta Terrace", "Sunset Village", "Rieber", "De Neve", "Olympic", "Centennial"].sort() // Sort by alphabetical order

  return (
    <div>
      <Button className="AddRequest" onClick={onClickAddRequest}><AddIcon /></Button>

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
        <TextField label="Item" variant="outlined" value={item} onChange={handleItemChange}/>

        <TextField
          value={urgency}
          onChange={handleUrgencyChange}
          select
          label="Urgency">
          {urgencies.map(u => <MenuItem value={u} key={u}>{u}</MenuItem>)}
        </TextField>

        <TextField
          value={loc}
          onChange={handleLocChange}
          select
          label="Place">
          {landmarks.map(place => <MenuItem value={place} key={place}>{place}</MenuItem>)}
        </TextField>

        <Button onClick={handleSubmit}>Submit Request</Button>
      </Stack>

      <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
      <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
      <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
    </div>
  );
}

export default HomePage;
