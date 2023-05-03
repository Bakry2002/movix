/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import './style.scss'


export const Genres = ({ data }) => {
    const { genres } = useSelector(state => state.home);
    return (
        <div className="genres">
            {
                data?.map((genre) => {
                    if(!genres[genre]?.name) return;
                    return (
                        <div key={genre} className="genre" data-id={genre}>
                            {genres[genre]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}
