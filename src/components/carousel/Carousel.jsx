/* eslint-disable react/prop-types */
import { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; // library to format date

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import PosterFallback from "../../assets/no-poster.png";
import { Genres } from "../genres/Genres";
import "./style.scss";

export const Carousel = ({ data, loading, mediaType }) => {
    const carouselContainer = useRef();
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();


    const carouselNavigationHandler = (direction) => {
        const container = carouselContainer.current;
        const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20) ;

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })
    }

    const skeletonItem = () => {
        return (
            <div className="skeleton-item">
                <div className="poster-block skeleton"></div>
                <div className="text-block">
                    <span className="title skeleton"></span>
                    <span className="date skeleton"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill className="carousel-left-nav arrow" onClick={() => carouselNavigationHandler('left')} />
                <BsFillArrowRightCircleFill className="carousel-right-nav arrow" onClick={() => carouselNavigationHandler('right')} />
                { !loading ? (
                        <div className="carousel-items" ref={carouselContainer}>
                            { data?.map(item => {
                                const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                return (
                                    <div 
                                        key={item.id} 
                                        className="carousel-item" 
                                        onClick={() => navigate(`/${item.media_type || mediaType}/${item.id}`)}
                                    >
                                        <div className="poster-block">
                                            <Img src={posterUrl}/>
                                            <CircleRating rating={item.vote_average.toFixed(1)}/>
                                            <Genres data={item.genre_ids.slice(0, 2)} /> 
                                        </div>
                                        <div className="text-block">
                                            <span className="title">{ item.title || item.name }</span>
                                            <span className="date">{ dayjs(item.release_date).format('MMM D, YYYY') }</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="loading-skeleton">
                            { skeletonItem() }
                            { skeletonItem() }
                            { skeletonItem() }
                            { skeletonItem() }
                            { skeletonItem() }
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}
