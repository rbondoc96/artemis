import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import {
    UIContext, 
    getWindowSize,
} from "./context/UIContext"

import {fetchData} from "./api"

import "./styles/theme.css"

const App: React.FC = () => {
    const {uiSize, uiTheme} = React.useContext(UIContext)
    const [size, setSize] =  uiSize
    const [theme, setTheme] = uiTheme
    const [data, setData] = React.useState(null)

    const onWindowResize = (event) => {
        setSize(getWindowSize(window.innerWidth))
    }

    const themeToggle = (event) => {
        if(theme.toLowerCase() == "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", onWindowResize)

        fetchData("/api/test2")
        .then((response: Response) => {
            console.log("Ok", response)

            response.json()
            .then(json => {
                console.log(json)
            })
        })
        .catch((response: Response) => {
            console.error("Error", response)
        })

        return () => {
            window.removeEventListener("resize", onWindowResize)
        }
    }, [])
    
    return(<div 
        className={(theme == "light")? "App" : "App--dark"}
        >
        <div>
            My App
        </div>
        <button onClick={themeToggle}>
            Change Theme
        </button>
        <Router>
            <Switch>
                
            </Switch>
        </Router>
    </div>)
}

export default App