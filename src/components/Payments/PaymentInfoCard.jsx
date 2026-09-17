import { Link } from "react-router";


function PaymentInfoCard (props){

    return(
        <div>
            <p>{props.id}</p>
            <p>{props.member}</p>
            <p>{props.membership}</p>
            <p>{props.amount}</p>
            <p>{props.date}</p>
            <p>{props.method}</p>
            <p>{props.action}</p>

            <Link to="#">View</Link>
        </div>
    );
};
export default PaymentInfoCard;