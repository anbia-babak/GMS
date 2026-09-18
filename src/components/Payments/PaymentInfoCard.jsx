import { Link } from "react-router";


function PaymentInfoCard (props){

    return(
        <div className="grid min-w-[900px] grid-cols-[0.7fr_1.3fr_1.3fr_0.9fr_1fr_0.9fr_0.7fr] items-center gap-4 border-b border-border px-5 py-4 text-sm transition-colors last:border-b-0 hover:bg-accent/50">
            <p className="font-semibold text-foreground">{props.id}</p>
            <p className="font-medium text-foreground">{props.member}</p>
            <p className="text-muted-foreground">{props.membership}</p>
            <p className="font-semibold text-foreground">{props.amount}</p>
            <p className="text-muted-foreground">{props.date}</p>
            <p className="text-muted-foreground">{props.method}</p>
            <p className="hidden">{props.action}</p>

            <Link to="#" className="font-semibold text-primary transition-colors hover:underline">View</Link>
        </div>
    );
};
export default PaymentInfoCard;