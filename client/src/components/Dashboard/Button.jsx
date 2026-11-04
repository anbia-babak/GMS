function Button(props) {
    const baseStyle = `inline-flex items-center gap-2 bg-primary text-primary-foreground shadow-primary/15 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-md 
        transition hover:bg-foreground focus:outline-none focus:ring-2 
        focus:ring-primary focus:ring-offset-2 
        focus:ring-offset-background`    

        const IconComponent = props.icon;
    return(
        <button type={props.buttonType}
        onClick={props.callback}
        className={baseStyle}
            >   
                {/* Render Lucide icon of passed  */}
                {IconComponent &&(
                    <span className="flex items-center justify-center" aria-hidden="true">
                        <IconComponent className="h-4 w-4" />
                    </span>
                )}
                {/* Render button sign/symbol if passed (e.g., "+") */}
                {props.buttonSign &&(
                    <span aria-hidden="true">{props.buttonSign}</span>
                )}
            <span className="text-lg leading-none" aria-hidden="true">{props.buttonSign}</span>
            {props.buttonName}</button>
    );
};
export default Button;
