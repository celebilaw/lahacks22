import React, { useState } from "react";
import classNames from "classnames";



function YellowButton({text, className, ...props}) {
        const [selected, setSelected] = useState(false);

    // function doSubmit() {
    //     console.log("submitted");
    //     console.log({text} + " " + {isClicked});
    // }
    const styles = classNames({
        "rounded-full h-12 w-60 m-2 bg-light-gold text-black font-bold text-lg \
         text-base \
         hover:border-2 hover:border-gold \
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
        <button className={styles} text={text} onClick={props.onClick}>
            {text}</button>
        </div>
    ); 
}

export default YellowButton;