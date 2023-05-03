import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import Img from "../../../components/lazyLoadImage/Img"

export const HeroBannerBackground = () => {
  const [background, setBackground] = useState(null)
  const { url } = useSelector(state => state.home)

  useEffect(() => {
    if(url.backdrop) {
      const MAX_PAGES = 3
      const requests = []
  
      for (let page = 1; page <= MAX_PAGES; page++) {
        requests.push(axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=b57d9d306f1886a0327527cc71fbdd03&page=${page}`))
      }
  
      Promise.all(requests)
      .then(res => {
        const backdrops = res
          .map(pageData => pageData.data.results.map(movie => movie.backdrop_path))
          .flat()
          .filter(backdrop => !!backdrop)
          .filter((backdrop, index, self) => self.indexOf(backdrop) === index)
          console.log("backdrops", backdrops)
        const randomIndex = Math.floor(Math.random() * backdrops.length)
        const bg = url.backdrop + backdrops[randomIndex]
        setBackground(bg)
      })
      .catch(error => console.error(error));
    }

  }, [ url.backdrop])

  return (
    <>
      {background && <Img src={background}/>}
    </>
  )
}

export default HeroBannerBackground;
