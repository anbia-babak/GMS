import { useEffect, useMemo, useState } from "react";
import SummaryCard from "../Dashboard/SummaryCard";
import Button from "../Dashboard/Button";
import Searchbar from "../Members/Searchbar";
import PaymentsNamesHeader from "../Payments/PaymentsNamesHeader";
import PaymentInfoCard from "../Payments/PaymentInfoCard";
import AddPaymentModal from "../Payments/AddPaymentModal";
import { getPayment, getPayments, getPaymentSummary } from "../../api/paymentsApi";
import { getApiErrorMessage } from "../../api/apiClient";
import {CreditCard , CreditCardCheck , CalendarDays, CircleDollarSign  } from "lucide-react";

const headers = ["ID", "Member", "Membership", "Amount", "Date", "Method", "Action"];

function Payments() {
    const [payments, setPayments] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        async function loadPayments() {
            setLoading(true);
            setError("");
            try {
                // The summary has its own endpoint, so totals stay correct even if the list is later filtered.
                const [paymentRows, paymentSummary] = await Promise.all([getPayments(), getPaymentSummary()]);
                setPayments(paymentRows);
                setSummary(paymentSummary);
            } catch (requestError) {
                setError(getApiErrorMessage(requestError, "Could not load payments. Please try again."));
            } finally {
                setLoading(false);
            }
        }
        loadPayments();
    }, [refreshKey]);

    const visiblePayments = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        return !query ? payments : payments.filter((payment) => [payment.payment_id, payment.member_name, payment.plan_name, payment.payment_method].some((value) => String(value || "").toLowerCase().includes(query)));
    }, [payments, searchTerm]);
    const summaryCards = summary ? [
        { id: "total-income", label: "Total Income", icon: CreditCard , value: `${Number(summary.totalIncome || 0).toLocaleString()} AFN` },
        { id: "payment-count", label: "Payments", icon: CreditCardCheck, value: summary.totalNumberOfPayments || 0 },
        { id: "month-income", label: "This Month", icon: CalendarDays, value: `${Number(summary.lastMonthIncome || 0).toLocaleString()} AFN` },
        { id: "month-count", label: "This Month Payments", icon: CreditCard, value: summary.numberOfLastMonthPayments || 0 },
    ] : [];

    async function handleView(paymentId) {
        try {
            setSelectedPayment(await getPayment(paymentId));
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Could not load the payment details."));
        }
    }

    return <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <header className="mb-7 flex justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-1 text-sm font-medium text-primary">Payment management</p>
                    <p className="!text-4xl font-extrabold tracking-tight text-foreground">Payments</p>
                    <p className="mt-1 text-sm text-muted-foreground">Manage and track member payments.</p>
                    </div>
    <Button buttonName="Add Payment" icon={CircleDollarSign} callback={() => setShowPaymentModal(true)}/>
        </header>

        {showPaymentModal && <AddPaymentModal onClose={() => setShowPaymentModal(false)} onPaymentAdded={() => setRefreshKey((key) => key + 1)} />}

        <div className="mx-auto mt-7 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => <SummaryCard key={card.id} {...card}/>)}
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl min-w-0 items-center gap-3 overflow-x-auto pb-1">
            <Searchbar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeHolder="Search payments..." />
        </div>

        {selectedPayment && <div className="mt-4 rounded-xl border border-border bg-card p-4 text-sm text-card-foreground">
            <div className="flex justify-between gap-4">
                <p><strong>Payment #{selectedPayment.payment_id}</strong> — {selectedPayment.member_name}, {selectedPayment.plan_name}, {Number(selectedPayment.amount).toLocaleString()} AFN, {selectedPayment.payment_method}
                </p>
                <button type="button" onClick={() => setSelectedPayment(null)} className="font-semibold text-primary">Close</button>
                </div>
            </div>}
        <div className="mx-auto mt-6 max-w-7xl overflow-x-auto rounded-xl border border-border bg-card shadow-lg shadow-black/10"><div className="grid min-w-[900px] grid-cols-[0.7fr_1.3fr_1.3fr_0.9fr_1fr_0.9fr_0.7fr] items-center gap-4 border-b border-border bg-muted/60 px-5 py-3">{headers.map((label) => <PaymentsNamesHeader key={label} label={label}/>)}</div><div className="min-w-[900px]">{loading ? <p className="p-6 text-center text-muted-foreground">Loading payments...</p> : error ? <div className="p-6 text-center"><p className="mb-3 text-red-500">{error}</p><button onClick={() => setRefreshKey((key) => key + 1)} className="rounded-lg bg-primary px-4 py-2 text-white">Try Again</button></div> : visiblePayments.length ? visiblePayments.map((payment) => <PaymentInfoCard key={payment.payment_id} {...payment} onView={handleView}/>) : <p className="p-6 text-center text-muted-foreground">No payments found.</p>}</div></div>
    </div></section>;
}

export default Payments;
