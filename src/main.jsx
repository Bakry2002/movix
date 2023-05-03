import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.scss'
import { store } from './store/store.js'


// once our store is created, we can make it available to our app by wrapping our App component in 
// a <Provider></Provider> component from react-redux
ReactDOM.createRoot(document.getElementById('root'))
.render(
    <Provider store={store}>
        <App />
    </Provider>
)
