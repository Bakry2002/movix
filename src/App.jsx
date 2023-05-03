import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from "react-redux";
// useSelector is a hook that allows you to extract (Read) data from the Redux store state, using a selector function.
// useDispatch is a hook that returns a reference to the dispatch function from the Redux store.
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import { Header } from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Home } from "./pages/home/Home";
import { Details } from "./pages/details/Details";
import { Explore } from "./pages/explore/Explore";
import { SearchResult } from "./pages/searchResult/SearchResult";
import { PageNotFound } from './pages/404/PageNotFound';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then(res => {

      const url =  {
        backdrop: res.images.secure_base_url + 'original', 
        poster: res.images.secure_base_url + 'original', 
        profile: res.images.secure_base_url + 'original'
      }

      dispatch(getApiConfiguration(url)); // dispatching an action to the store
    })
  }

  const fetchGenres = async () => {
    let requests = []; 
    let mediaTypes = ['movie', 'tv'];
    let allGenres = {};

    mediaTypes.forEach((mediaType) => {
      requests.push(fetchDataFromApi(`/genre/${mediaType}/list`))
    })

    const data = await Promise.all(requests);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
