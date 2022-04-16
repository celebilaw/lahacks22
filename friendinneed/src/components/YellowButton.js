import React, { useState } from "react";
import classNames from "classnames";

function YellowButton({className, ...props}) {
        const [selected, setSelected] = useState(false);
    

    function doClick() {
        setSelected(!selected); 
    }

    function doSubmit() {
    }

    // function doSubmit() {
    //     console.log("submitted");
    //     console.log({text} + " " + {isClicked});
    // }
    const styles = classNames({
        "rounded-lg h-99 w-28 m-2 border-2 bg-light-gold border-light-gold text-black \
         hover:border-gold \
         active:bg-gold border-gold \
         focus:shadow-md focus:shadow-light-gray": true,

        // "border-grey text-grey \
        //  hover:bg-grey  hover:text-white \
        //  active:outline-none active:border-purple \
        //  focus:shadow-md focus:shadow-purple focus:outline-none focus:text-white focus:bg-grey": !selected,

        // "bg-purple border-purple text-white \
        // focus:outline-none focus:shadow-md focus:shadow-purple": selected,

        [`${className}`]: true,
    })

    return (
        <div>
        <button onSubmit={doSubmit} className={styles}>
            Button
            </button>
        </div>
    ); 
}

export default YellowButton;