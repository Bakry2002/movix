import { useState, useEffect} from 'react'
import { fetchDataFromApi } from '../utils/api'

const useFetch = (url) => {
    const [ data, setData ] = useState(null); // to keep track of the data we get from the API
    const [ isLoading, setLoading ] = useState(null); // to keep track of the loading state
    const [ error, setError ] = useState(null); // to keep track of the error state

    useEffect(() => {
        setLoading("loading..."); 
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then(res => {
                setLoading(false);
                setData(res);
            })
            .catch(err => {
                setLoading(false);
                setError('Something went wrong!', err);
            })
    }, [url])

    return { data, isLoading, error }; // returning an object with the data, loading and error state to be used in the component
}

export default useFetch; // exporting the custom hook
