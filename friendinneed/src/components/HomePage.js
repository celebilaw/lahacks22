import React from 'react'
import "./HomePage.css"
import Request from "./Request"

function HomePage() {

  return (
    <div>
        <h1>Friend in Need</h1>
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu"/>
    </div>
  );
}

export default HomePage;
