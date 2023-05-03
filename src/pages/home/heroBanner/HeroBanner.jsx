import './style.scss'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch'; // my custom hook
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
// import HeroBannerBackground from './HeroBannerBackground';

export const HeroBanner = () => {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); 
    const { data, isLoading } = useFetch(`/movie/upcoming`);
    const { url } = useSelector(state => state.home)
    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);


    const searchQueryHandler = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className="hero-banner">
            {
                !isLoading && 
                <div className="backdrop-img">
                    <Img src={background}/>
                </div>
            }
{/*                 <div className="backdrop-img">
                    <HeroBannerBackground/>
                </div> */}
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
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
            
        </div>
    )
}
