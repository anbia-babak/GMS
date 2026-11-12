import { useLocale } from "../../i18n/useLocale";
import { Eye } from "lucide-react";
function PaymentInfoCard (props){
    const { t, formatDate, formatCurrency, translateValue } = useLocale();

    return(
        <div className="grid min-w-[900px] grid-cols-[0.7fr_1.3fr_1.3fr_0.9fr_1fr_0.9fr_0.7fr] items-center gap-4 border-b border-border px-5 py-4 text-sm transition-colors last:border-b-0 hover:bg-accent/50">
            <p className="font-medium text-muted-foreground">#{props.payment_id}</p>
            <p className="font-bold text-foreground">{props.member_name}</p>
            <p className="text-muted-foreground">{props.plan_name}</p>
            <p className="font-bold text-foreground">{formatCurrency(props.amount)}</p>
            <p className="text-muted-foreground">{formatDate(props.payment_date)}</p>
            <p className="text-muted-foreground">{translateValue(props.payment_method)}</p>

            <button
                type="button"
                onClick={() => props.onView(props.payment_id)}
                aria-label={t("View payment details")}
                title={t("View")}
                className="inline-flex min-h-10 items-center justify-self-end gap-2 rounded-lg border border-primary/30 px-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                <Eye size={18} aria-hidden="true" />
                <span>{t("View")}</span>
            </button>
        </div>
    );
};
export default PaymentInfoCard;
