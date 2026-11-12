import { useLocale } from "../../i18n/useLocale";
const nameHeaders = [
    {label: "ID"},
    {label: "Name"},
    {label: "Phone"},
    {label: "Joined"},
    {label: "Status"},
]

function MembersNamesHeader(){
    const { t } = useLocale();

    return(
        <div className="grid w-full min-w-[850px] grid-cols-[minmax(4.5rem,.45fr)_minmax(14rem,1.8fr)_minmax(9rem,1fr)_minmax(10rem,1.1fr)_minmax(9rem,1fr)_auto] items-center gap-3 border-b border-border bg-secondary/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {nameHeaders.map((item) => (
                <p key={item.label} className="min-w-0">{t(item.label)}</p>
            ))}
            <span className="justify-self-end">{t("Action")}</span>
        </div>
    );
};
export default MembersNamesHeader;
