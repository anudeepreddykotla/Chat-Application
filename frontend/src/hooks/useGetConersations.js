import React, { useEffect } from 'react'

function useGetConersations() {
    const [loading, setLoading] = React.useState(true);
    const [conversations, setConversations] = React.useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversation();
    },[]);
    return {loading, conversations};
}

export default useGetConersations