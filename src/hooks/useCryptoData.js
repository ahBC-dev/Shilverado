import { useState, useEffect } from 'react';
import { getCryptoData } from "../utils/cryptoAPI"

// hooks/useCryptoData.js
export function useCryptoData() {
    const [cryptoData, setCryptoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getCryptoData();
                setCryptoData(data);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    return { cryptoData, isLoading, error };
}