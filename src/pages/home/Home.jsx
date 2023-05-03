
import './style.scss'
import { HeroBanner } from './heroBanner/HeroBanner'
import { Trending } from './trending/Trending'

export const Home = () => {
  return (
    <div className="home-page">
        <HeroBanner />
        <Trending />
        <div style={{height: 500}}></div>
    </div>
  )
}
