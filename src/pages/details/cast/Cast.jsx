/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skeleton-item">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="cast-section">
            <ContentWrapper>
                <div className="section-heading">Top Cast</div>
                {!loading ? (
                    <div className="list-items">
                        
                        {   
                            data?.filter((person, index, self) => self.findIndex((p) => p.id === person.id) === index)
                            .map((person) => {
                                let imgUrl = person.profile_path ? url.profile + person.profile_path : avatar;
                                return (
                                    <div className="list-item cast" key={person.id} data-id={person.id}>
                                        <div className="profile-img">
                                            <Img src={imgUrl} alt={person.name} />
                                        </div>
                                        <div className="name">{person.name}</div>
                                        <div className="character">{person.character}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="cast-skeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
