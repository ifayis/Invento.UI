export const getApiErrorMessage = (
    error,
    fallback = "Something went wrong. Please try again."
) => {
    if (!error) {
        return fallback;
    }

    if (typeof error === "string") {
        return error;
    }

    if (error.data) {
        if (typeof error.data === "string") {
            return error.data;
        }

        if (error.data.message) {
            return error.data.message;
        }

        if (error.data.title) {
            return error.data.title;
        }

        if (error.data.errors) {
            const errors = error.data.errors;

            if (Array.isArray(errors)) {
                return errors.join(" ");
            }

            if (
                typeof errors === "object"
            ) {
                return Object.values(errors)
                    .flat()
                    .join(" ");
            }
        }
    }

    if (error.message) {
        return error.message;
    }

    return fallback;
};