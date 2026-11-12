import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { useLocale } from "../../i18n/useLocale";

export default function RouteError({ notFound = false }) {
    const { t } = useLocale();
    const error = useRouteError();
    const missing = notFound || (isRouteErrorResponse(error) && error.status === 404);
    return (
        <main className="grid min-h-screen place-content-center gap-4 bg-background p-6 text-center text-foreground">
            <h1 className="text-3xl font-extrabold">{missing ? t("Page not found") : t("Something went wrong.")}</h1>
            <Link className="font-semibold text-primary underline" to="/dashboard">{t("Go to dashboard")}</Link>
        </main>
    );
}
