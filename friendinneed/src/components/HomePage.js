import React, { useState } from 'react'
import "./HomePage.css"
import Request from "./Request"

function HomePage() {

  return (
    <div>
      <div className="RequestCards">
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
        <Request title="Tweezers" desc="I need tweezers to pull out an ASUCLA food ticket I got stuck in my phone wallet. Thank you so much!" requester="Celebi Law" status="Fulfilled by Kyle Pu" />
      </div>
    </div>
  );
}

export default HomePage;
