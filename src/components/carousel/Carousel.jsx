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
import "./style.scss";

export const Carousel = ({ data, isLoading }) => {
    const carouselContainer = useRef();
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();

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
                <BsFillArrowLeftCircleFill className="carousel-left-nav arrow" onClick={() => navigate('left')} />
                <BsFillArrowRightCircleFill className="carousel-right-nav arrow" onClick={() => navigate('right')} />
                { !isLoading ? (
                        <div className="carousel-items">
                            { data?.map(item => {
                                const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                return (
                                    <div key={item.id} className="carousel-item">
                                        <div className="poster-block">
                                            <Img src={posterUrl}/>
                                            <CircleRating rating={item.vote_average}/>
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
