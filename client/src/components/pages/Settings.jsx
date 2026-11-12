import { useLocale } from "../../i18n/useLocale";
import GymInformation from "../Settingss/GymInformation";
import MembershipPlans from "../Settingss/MembershipPlans";
import AccountSettings from "../Settingss/AccountSettings";

function Settings() {
    const { t } = useLocale();
  return (
    <main className="min-h-full bg-background py-6 text-[#DAF1DE] sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <h1 className="m-0 text-3xl font-extrabold text-foreground sm:text-4xl">{t("Settings")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("Manage your gym and account settings.")}</p>
        </header>
        <div className="space-y-6">
          <GymInformation />
          <MembershipPlans />
          <AccountSettings />
        </div>
      </div>
    </main>
  );
};
export default Settings;
