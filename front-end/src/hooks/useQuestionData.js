import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useQuestionData = (filter) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const token = await getAccessTokenSilently();

                const params = {};

                if(Array.isArray(filter.tags) && filter.tags.length > 0) {
                    params.tags = filter.tags.map(t => t.name).join(',');
                }

                ['searchText', 'assignee'].forEach(k => {
                    if(filter[k]) {
                        params[k] = filter[k];
                    }
                })
                const query = new URLSearchParams({
                    ...params,
                });
                const response = await fetch(`http://localhost:3001/v1/questions?${query}`, {
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
    }, [filter.tags, filter.searchText, filter.assignee]);

    return { data, loading }
}

export default useQuestionData;