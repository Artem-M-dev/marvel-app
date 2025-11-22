import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null) => {

        setLoading(true); // Так мы установили загрузку

        // Дальше нам нужно отправить fetch() на сервер
        // Чтобы отловить ошибки нам нужно использовать структуру try catch

        try {
            const response = await fetch(url, {method, body});

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status}`)
            }

            const data = await response.json();

            // После этих действий, если все хорошо данные должны уже загрузится
            // Значит нужно убрать загрузку
            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, []);


    // Эта функция будет просто чистить наши ошибки
    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError}
}