/* eslint-disable react/prop-types */
import React ,{ useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import  Img  from "../../../components/lazyLoadImage/Img";
import posterFallback from "../../../assets/no-poster.png";
import {Genres} from '../../../components/genres/Genres'
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayBtn } from "./PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";



export const DetailsBanner = ({ video, crew }) => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector((state) => state.home);

    const [show, setShow] = useState(false);
    const [ videoId, setVideoId ] = useState(null);

    const _genre = data?.genres?.map((genre) => genre.id) // for genres component 

    // find main crew (Director, Writer)
    const director = crew?.filter((person) => person.job === "Director"); 
    const writer = crew?.filter(person => person.job === "Writer" || person.job === "Screenplay" || person.job === "Story")

    const calculateRunTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="details-banner">
            {!loading ? (
                <>
                    { !!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data.backdrop_path}/>
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {
                                                data.poster_path ? (
                                                    <Img className={"poster-img"} src={url.poster + data.poster_path} />
                                                ) : (
                                                    <Img className={"poster-img"} src={posterFallback} />
                                                )
                                            }
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data.title || data.name} (${dayjs(data?.release_date).format('YYYY')})`}
                                            </div>
                                            <div className="subtitle">{data.tagline}</div>
                                            <Genres data={_genre} />
                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)} />
                                                <div className="play-btn" onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video?.key);
                                                }}>
                                                    <PlayBtn />
                                                    <span className="text">Watch Trailer</span>
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data.overview}</div>
                                            </div>

                                            <div className="info">
                                                { data.status && (
                                                    <div className="info-item">
                                                        <span className="text bold">Status:{" "}</span>
                                                        <span className="text">{data.status}</span>
                                                    </div>
                                                )}
                                                { data.release_date && (
                                                    <div className="info-item">
                                                        <span className="text bold">Release Date:{" "}</span>
                                                        <span className="text">{dayjs(data.release_date).format('MMM D, YYYY')}</span>
                                                    </div>
                                                )}
                                                { data.runtime !== 0 && (
                                                    <div className="info-item">
                                                        <span className="text bold">Runtime:{" "}</span>
                                                        <span className="text">{calculateRunTime(data.runtime || data.episode_run_time[0])}</span>
                                                    </div>
                                                )}
                                            </div>

                                            { director?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Director:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {director?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ", "} {/* if there is more than one name separate them by comma */}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}
                                            { writer?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Writer:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {writer?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {writer.length - 1  !== i && ", "} {/* if there is more than one name separate them by comma */}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                            { data?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Creator:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data?.created_by?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data?.created_by.length - 1  !== i && ", "} {/* if there is more than one name separate them by comma */}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                                </ContentWrapper>
                            </React.Fragment>
                        ) 
                    }
                </>
            ) : (
                <div className="details-banner-skeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

