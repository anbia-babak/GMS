export function memberRows(summary = {}) {
    return [
        ["Active members", summary.active_count],
        ["Deactivated members", summary.deactivated_count],
        ["Other status", summary.other_status_count],
        ["Total members", summary.total_count],
    ];
}

export function membershipRows(summary = {}) {
    return [
        ["Active memberships", summary.active_count],
        ["Expiring soon", summary.expiring_soon_count],
        ["Expired memberships", summary.expired_count],
        ["Total memberships", summary.total_count],
    ];
}
