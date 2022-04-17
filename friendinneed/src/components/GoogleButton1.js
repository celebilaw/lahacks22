import React, { useState } from "react";
import classNames from "classnames";
import google from './icons/google.svg';

function GoogleButton1({className, ...props}) {
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
        "flex-auto gap-x-5 align-center rounded-full h-7 w-64 m-2 border-2 bg-white border-light-gray text-black \
         hover:border-light-blue \
         active:border-blue \
         focus:shadow-md focus:shadow-light-gray focus:border-blue": true,

        // "border-grey text-grey \
        //  hover:bg-grey  hover:text-white \
        //  active:outline-none active:border-purple \
        //  focus:shadow-md focus:shadow-purple focus:outline-none focus:text-white focus:bg-grey": !selected,

        // "bg-purple border-purple text-white \
        // focus:outline-none focus:shadow-md focus:shadow-purple": selected,

        [`${className}`]: true,
    })

    return (
        <div className="">
        <button onSubmit={doSubmit} className={styles}>
        <img src={google} style={{height: 15, display: 'unset'}}></img>
            <span>                   Continue with Google</span>
            </button>
        </div>
    ); 
}

export default GoogleButton1;