import React from "react";

function Button(props) {

    return(
        <button type={props.buttonType}
        onClick={props.callback}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md 
            shadow-primary/15 transition hover:bg-foreground focus:outline-none focus:ring-2 
            focus:ring-primary focus:ring-offset-2 
            focus:ring-offset-background"
            ><span className="text-lg leading-none" aria-hidden="true">{props.buttonSign}</span>
            {props.buttonName}</button>
    );
};
export default Button;