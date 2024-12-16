import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import config from '../config.json';

const useTags = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    const fetchData = async () => {
        setLoading(true)
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(`${config.baseUrl}/tags`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, fetchData }
}

export default useTags;