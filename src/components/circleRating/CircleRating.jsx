import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

// eslint-disable-next-line react/prop-types
const CircleRating = ({ rating }) => {
    return (
        <div className="circle-rating">
            <CircularProgressbarWithChildren value={rating} maxValue={10} styles={buildStyles({
                pathColor:
                    rating < 5 ? "red" : rating < 7 ? "orange" : "green",
            })}>
                <span className="CircularProgressbar-text">{rating > 0 ? rating*10 : 0}</span>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default CircleRating;