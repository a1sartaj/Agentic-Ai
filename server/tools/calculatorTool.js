
export const calculate = (expression) => {
    try {
        const result = eval(expression);
        return { expression, result };
    } catch {
        return { error: "Invalid expression" };
    }
};