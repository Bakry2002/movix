import './style.scss'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
// import { fetchDataFromApi } from '../../../utils/api';
// import HeroBannerBackground from './HeroBannerBackground';

export const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, isLoading } = useFetch("/movie/upcoming");


    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data, url.backdrop]);


    const searchQueryHandler = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }


/*     const getHeroBannerBg = async () => {
        const MAX_PAGES = 5;
        
        let allBackdrops = {}; 

        // fetch data from the API for each page and push the promises to an array
        let requests = [];
        for (let page = 1; page <= MAX_PAGES; page++) {
            requests.push(fetchDataFromApi(`/movie/upcoming?page=${page}`));
        }

        // wait for all the promises to resolve and extract the backdrop paths
        const data = await Promise.all(requests);

        data.map(({ results } ) => {
            return results.map((backdrop) => {
                    allBackdrops[backdrop.id] = backdrop.backdrop_path
                })
        });

        // filter the null values from the object and assign to a new object with keys starting from 1
        const filteredBackdrops = {};
        let counter = 1;
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(allBackdrops)) {
            if (value !== null) {
                filteredBackdrops[counter] = value; 
                counter++;
            }
        }
        // generate a random number between 1 and the length of the filteredBackdrops object
        const randomIndex = Math.floor(Math.random() * Object.keys(filteredBackdrops).length) + 1;
        console.log("randomIndex: ", randomIndex)
        // set a random backdrop from the filteredBackdrops object to the background state
        setBackground(url.backdrop + filteredBackdrops[randomIndex]);
    } */
    return (
        <div className="hero-banner">
            { !isLoading && (
                    <div className="backdrop-img">
                        <Img src={background} />
                    </div>
                )
            }
            <div className="opacity-layer"></div> {/* for Styling purposes */}
            <ContentWrapper>
                <div className="hero-banner__content">
                    <span className="title">Welcome.</span>
                    <span className="sub-title">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="search-input">
                        <input type="text" 
                            id="searchInput" 
                            placeholder="Search for a movie or tv show ..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={() => navigate(`/search/${query}`)}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
            
        </div>
    )
}
