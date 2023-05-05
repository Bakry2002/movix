/* eslint-disable react/prop-types */
// Similar Carousel Component
import {Carousel} from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    if (data?.results.length !== 0) {
        const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
        return (
            <Carousel
                title={title}
                data={data?.results}
                loading={loading}
                mediaType={mediaType}
            />
        );
    }


};

export default Similar;