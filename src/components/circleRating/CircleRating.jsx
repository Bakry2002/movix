import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

// eslint-disable-next-line react/prop-types
const CircleRating = ({ rating }) => {
    return (
        <div className="circle-rating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating * 10}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;