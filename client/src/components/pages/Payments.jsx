import { useLocale } from "../../i18n/useLocale";
import { useCallback, useEffect, useMemo, useState } from "react";
import SummaryCard from "../Dashboard/SummaryCard";
import Button from "../Dashboard/Button";
import Searchbar from "../Members/Searchbar";
import PaymentsNamesHeader from "../Payments/PaymentsNamesHeader";
import PaymentInfoCard from "../Payments/PaymentInfoCard";
import AddPaymentModal from "../Payments/AddPaymentModal";
import PaymentDetailsModal from "../Payments/PaymentDetailsModal";
import Pagination from "../common/Pagination";
import { getPayment, getPayments, getPaymentSummary } from "../../api/paymentsApi";
import { getApiErrorMessage } from "../../api/apiClient";
import {CreditCard , CreditCardCheck , CalendarDays, CircleDollarSign  } from "lucide-react";

const headers = ["ID", "Member", "Membership", "Amount", "Date", "Method", "Action"];

function Payments() {
    const { t, formatCurrency, translateError } = useLocale();
    const [payments, setPayments] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        async function loadPayments() {
            setCurrentPage(1);
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

    const filteredPayments = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        return !query ? payments : payments.filter((payment) => [payment.payment_id, payment.member_name, payment.plan_name, payment.payment_method].some((value) => String(value || "").toLowerCase().includes(query)));
    }, [payments, searchTerm]);
    const pageCount = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
    const effectivePage = Math.min(currentPage, pageCount);
    const visiblePayments = filteredPayments.slice((effectivePage - 1) * pageSize, effectivePage * pageSize);
    const summaryCards = summary ? [
        { id: "total-income", label: t("Total Income"), icon: CreditCard , value: formatCurrency(summary.totalIncome || 0) },
        { id: "payment-count", label: t("Payments"), icon: CreditCardCheck, value: summary.totalNumberOfPayments || 0 },
        { id: "month-income", label: t("This Month"), icon: CalendarDays, value: formatCurrency(summary.lastMonthIncome || 0) },
        { id: "month-count", label: t("This Month Payments"), icon: CreditCard, value: summary.numberOfLastMonthPayments || 0 },
    ] : [];

    async function handleView(paymentId) {
        setPaymentDetails({ payment: null, loading: true, error: "" });
        try {
            const payment = await getPayment(paymentId);
            setPaymentDetails({ payment, loading: false, error: "" });
        } catch (requestError) {
            setPaymentDetails({
                payment: null,
                loading: false,
                error: getApiErrorMessage(requestError, "Could not load the payment details."),
            });
        }
    }

    const closePaymentDetails = useCallback(() => setPaymentDetails(null), []);

    return <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="mb-1 text-sm font-medium text-primary">{t("Payment management")}</p>
                    <h1 className="!text-4xl font-extrabold tracking-tight text-foreground">{t("Payments")}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{t("Manage and track member payments.")}</p>
                    </div>
    <Button buttonName={t("Add Payment")} icon={CircleDollarSign} callback={() => setShowPaymentModal(true)}/>
        </header>

        {showPaymentModal && <AddPaymentModal onClose={() => setShowPaymentModal(false)} onPaymentAdded={() => setRefreshKey((key) => key + 1)} />}

        <div className="mx-auto mt-7 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => <SummaryCard key={card.id} {...card}/>)}
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl min-w-0 items-center gap-3 overflow-x-auto pb-1">
            <Searchbar value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }} placeHolder={t("Search payments...")} />
        </div>

        {paymentDetails && (
            <PaymentDetailsModal
                payment={paymentDetails.payment}
                loading={paymentDetails.loading}
                error={paymentDetails.error}
                onClose={closePaymentDetails}
            />
        )}
        <div className="mx-auto mt-6 max-w-7xl overflow-x-auto rounded-xl border border-border bg-card shadow-lg shadow-black/10"><div className="grid min-w-[900px] grid-cols-[0.7fr_1.3fr_1.3fr_0.9fr_1fr_0.9fr_0.7fr] items-center gap-4 border-b border-border bg-muted/60 px-5 py-3">{headers.map((label) => <PaymentsNamesHeader key={label} label={t(label)}/>)}</div><div className="min-w-[900px]">{loading ? <p className="p-6 text-center text-muted-foreground">{t("Loading payments...")}</p> : error ? <div className="p-6 text-center"><p className="mb-3 text-red-500">{translateError(error)}</p><button onClick={() => setRefreshKey((key) => key + 1)} className="rounded-lg bg-primary px-4 py-2 text-white">{t("Try Again")}</button></div> : visiblePayments.length ? visiblePayments.map((payment) => <PaymentInfoCard key={payment.payment_id} {...payment} onView={handleView}/>) : <p className="p-6 text-center text-muted-foreground">{t("No payments found.")}</p>}</div></div>
        {!loading && !error && <Pagination total={filteredPayments.length} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} />}
    </div></section>;
}

export default Payments;
