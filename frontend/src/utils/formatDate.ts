export const formattedDate = (givenDate: string) => {
    const date = new Date(givenDate);

    // Define months array
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Get day, month, and year
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
};
