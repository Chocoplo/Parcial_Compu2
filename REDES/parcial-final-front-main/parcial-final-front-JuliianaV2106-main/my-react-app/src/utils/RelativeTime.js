export const relativeTimeConversion = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffMs = now - createdAt;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const formatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

    if (diffMinutes < 60) {
        return formatter.format(-diffMinutes, "minutes");
    } else if (diffHours < 24) {
        return formatter.format(-diffHours, "hours");
    } else {
        return formatter.format(-diffDays, "days");
    }
};