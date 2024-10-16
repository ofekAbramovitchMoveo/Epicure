import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"

import App from "./App"
import { store } from "./store/store"
import './assets/styles/main.scss'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
