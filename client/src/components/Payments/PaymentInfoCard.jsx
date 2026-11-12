function PaymentInfoCard (props){

    return(
        <div className="grid min-w-[900px] grid-cols-[0.7fr_1.3fr_1.3fr_0.9fr_1fr_0.9fr_0.7fr] items-center gap-4 border-b border-border px-5 py-4 text-sm transition-colors last:border-b-0 hover:bg-accent/50">
            <p className="font-medium text-muted-foreground">#{props.payment_id}</p>
            <p className="font-medium text-foreground">{props.member_name}</p>
            <p className="text-muted-foreground">{props.plan_name}</p>
            <p className="font-semibold text-foreground">{Number(props.amount).toLocaleString()} AFN</p>
            <p className="text-muted-foreground">{String(props.payment_date).slice(0, 10)}</p>
            <p className="text-muted-foreground">{props.payment_method}</p>

            <button type="button" onClick={() => props.onView(props.payment_id)} className="font-semibold text-primary transition-colors hover:underline">View</button>
        </div>
    );
};
export default PaymentInfoCard;
