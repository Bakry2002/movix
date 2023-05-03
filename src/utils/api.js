import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTdkOWQzMDZmMTg4NmEwMzI3NTI3Y2M3MWZiZGQwMyIsInN1YiI6IjYzZGQwYWFiNDU3NjVkMDA4NTA4NDQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.chsEWQYYPQVh2m6v4MZHrHO-L70In-FPY7HnD4ZKK7M'; // how to import env variables in react 

const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
}




export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        })
        return data;
    } catch (error) {
        console.log(error);
        return error; 
    }
} 
