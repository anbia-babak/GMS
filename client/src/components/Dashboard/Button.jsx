import React from "react";

function Button(props) {

    // Tracking the Button Type(Color) (primary or secondary) and Setting their stylings:
    const varientColor = props.buttonColor; 
    const varientButtonColors = {
        primary: "bg-primary text-primary-foreground shadow-primary/15",
        secondary: "bg-secondary text-secondary-foreground",
    };


    return(
        <button type={props.buttonType}
        onClick={props.callback}
        className={`inline-flex items-center gap-2 bg-primary text-primary-foreground shadow-primary/15 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-md 
            transition hover:bg-foreground focus:outline-none focus:ring-2 
            focus:ring-primary focus:ring-offset-2 
            focus:ring-offset-background`}
            ><span className="text-lg leading-none" aria-hidden="true">{props.buttonSign}</span>
            {props.buttonName}</button>
    );
};
export default Button;