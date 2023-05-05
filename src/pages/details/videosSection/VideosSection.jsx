/* eslint-disable react/prop-types */
import { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayBtn } from "../detailsBanner/PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const loadingSkeleton = () => {
        return (
            <div className="skeleton-item">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videos-section">
                {data?.results.length !== 0 && (
                    <ContentWrapper>
                        <div className="section-heading">Official Videos</div>
                        { !loading ? (
                    <div className="videos">
                    {
                        data?.results?.map((video) => {
                            return (
                                <div className="video-item" key={video.id} onClick={() => {
                                        setVideoId(video.key);
                                        setShow(true);
                                    }}
                                >
                                    <div className="video-thumbnail">
                                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                        <PlayBtn />
                                    </div>
                                    <div className="video-title">{video.name}</div>
                                </div>
                            );
                        }
                    )}
                    </div>
                ) : (
                    <div className="video-skeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
                </ContentWrapper>

                )}

            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
