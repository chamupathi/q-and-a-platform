import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useProperties = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const token = await getAccessTokenSilently();

                const response = await fetch(`http://localhost:3001/v1/properties`, {
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

        fetchData();
    }, []);

    return { data, loading }
}

export default useProperties;