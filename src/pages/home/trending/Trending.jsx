import { useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import { SwitchTabs } from "../../../components/switchTabs/SwitchTabs"
import { Carousel } from "../../../components/carousel/Carousel"
import useFetch from "../../../hooks/useFetch"


export const Trending = () => {
    const [ timeWindow, setTimeWindow ] = useState('day'); // day or week 
    const { data, loading } = useFetch(`/trending/all/${timeWindow}`)

    const onTabChange = (timeWindowData) => {
        setTimeWindow(timeWindowData === "Day" ? "day" : "week")
    }

    return (
        <div className="carousel-section">
            <ContentWrapper>
                <div className="carousel__title">Trending</div>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>

    )
}
