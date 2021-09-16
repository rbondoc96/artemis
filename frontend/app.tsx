import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Container from "react-bootstrap/Container"

import {
    UIContext, 
    getWindowSize,
} from "./context/UIContext"

import Component from "./components/mycomponent"

import {fetchData} from "./api"

import "./styles/theme.scss"

const App: React.FC = () => {
    const {uiSize, uiTheme} = React.useContext(UIContext)
    const [size, setSize] =  uiSize
    const [theme, setTheme] = uiTheme
    const [data, setData] = React.useState(null)

    const onWindowResize = (event: UIEvent) => {
        setSize(getWindowSize(window.innerWidth))
    }

    const themeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(theme.toLowerCase() == "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
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
    
    return(<div 
        className={(theme == "light")? "App" : "App--dark"}
        >
        <Router>
            <Container>
                <div>
                    My App
                </div>
                <button onClick={themeToggle}>
                    Change Theme
                </button>
                <Component message="I'm optional! ">
                    My component
                </Component>
                
                <Switch>
                
                </Switch>
            </Container>
        </Router>
    </div>)
}

export default App