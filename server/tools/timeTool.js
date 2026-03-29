
export const getTime = (timezone = "UTC") => {
    return {
        timezone,
        time: new Date().toLocaleString("en-US", { timeZone: timezone })
    };
};