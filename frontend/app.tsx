import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import {Container, Row} from "react-bootstrap"

import {
    UIContext, 
    getWindowSize,
} from "./context/UIContext"

import Navigation from "./components/header/Navigation"
import Footer from "./components/footer/Footer"
import Home from "./pages/Home"

import {fetchData} from "./api"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/theme.scss"

export default function App() {
    const {uiSize} = React.useContext(UIContext)
    const [size, setSize] =  uiSize

    const onWindowResize = (event: UIEvent) => {
        setSize(getWindowSize(window.innerWidth))
    }

    React.useEffect(() => {
        window.addEventListener("resize", onWindowResize)

        // Example of how fetchData() utility function is used 
        
        // fetchData("/api/test2")
        // .then((response: Response) => {
        //     console.log("Ok", response)

        //     response.json()
        //     .then(json => {
        //         console.log(json)
        //     })
        // })
        // .catch((response: Response) => {
        //     console.error("Error", response)
        // })

        return () => {
            window.removeEventListener("resize", onWindowResize)
        }        
    }, [])
    

    return(<div className="app">
        <Router>
            <header>
                <Navigation/>
            </header>
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </main>
            <footer>
                <Footer />
            </footer>
        </Router>
    </div>)
}