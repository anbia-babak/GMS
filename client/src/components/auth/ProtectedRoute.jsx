import { useLocale } from "../../i18n/useLocale";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { t } = useLocale();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((response) => {
        if (active) {
          setStatus(response.ok ? "authenticated" : "unauthenticated");
        }
      })
      .catch(() => {
        if (active) {
          setStatus("unauthenticated");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <div>{t("Checking authentication...")}</div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}