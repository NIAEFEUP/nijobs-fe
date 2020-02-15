export const smoothScrollToRef = (ref) => {

    if (!ref || !ref.current) return;

    ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

export const capitalize = (str) => {
    if (typeof str !== "string") throw new Error("Trying to capitalize non string object: ", str);

    return str.charAt(0).toUpperCase() + str.slice(1);
};
