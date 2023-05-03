/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import { SwitchTabs } from "../../../components/switchTabs/SwitchTabs"
import { Carousel } from "../../../components/carousel/Carousel"
import useFetch from "../../../hooks/useFetch"


export const TopRated = () => {
    const [ mediaType, setMediaType ] = useState('movie'); // day or week 
    const { data, isLoading } = useFetch(`/${mediaType}/top_rated`)

    const onTabChange = (mediaType) => {
        setMediaType(mediaType === "Movies" ? "movie" : "tv")
    }

    return (
        <div className="carousel-section">
            <ContentWrapper>
                <div className="carousel__title">Top Rated</div>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={isLoading} mediaType={mediaType}/>
        </div>

    )
}