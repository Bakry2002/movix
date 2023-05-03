import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.scss'
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/movix-logo.svg";


export const Header = () => {
    const [ show, setShow ] = useState("top"); // show the header on top of the page by default
    const [ lastScrollY, setLastScrollY ] = useState(0); // last scroll position
    const [ mobileMenu, setMobileMenu ] = useState(false); // mobile menu
    const [ query, setQuery ] = useState(""); // search query
    const [ showSearch, setShowSearch ] = useState(""); // show search bar
    const navigate = useNavigate();
    const location = useLocation();

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const searchQueryHandler = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {
                setShowSearch(false);
            },1000)
        }
    }

    const navigationHandler = (type) => {
        if (type === 'movie') {
            navigate(`/explore/movie`); 
        } else if (type === 'tv') {
            navigate(`/explore/tv`); 
        }
        setMobileMenu(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if(window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }
    
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar); 
        return () => window.removeEventListener('scroll', controlNavbar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY])


    return (
        <header className={`header ${mobileMenu ? 'mobile-view' : ''} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <Link to={'/'}>
                        <img src={logo} alt="Movix" />
                    </Link>
                    
                </div>
                <ul className={`menu-items`}>
                    <li className="menu-item" onClick={() => navigationHandler('movie')}>Movies</li>
                    <li className="menu-item" onClick={() => navigationHandler('tv')}>TV Shows</li>
                    <li className="menu-item"><HiOutlineSearch onClick={openSearch}/></li>
                </ul>

                <div className="mobile-menu-items">
                    <HiOutlineSearch onClick={openSearch}/>
                    {
                        mobileMenu ? (
                            <VscChromeClose onClick={() => setMobileMenu(false)}/>
                        ) : (
                            <SlMenu onClick={openMobileMenu}/>
                        )
                    }
                </div>
            </ContentWrapper>
            { showSearch && 
                            <div className="search-bar">
                            <ContentWrapper>
                                <div className="search-input">
                                    <input type="text" 
                                        id="searchInput" 
                                        placeholder="Search for a movie or tv show ..."
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyUp={searchQueryHandler}
                                    />
                                    <VscChromeClose onClick={() => setShowSearch(false)}/>
                                </div>
                            </ContentWrapper>
                        </div>
            }
        </header>
    )
}
