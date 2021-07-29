import React from "react"
import ReactDOM from "react-dom"

import {UIProvider} from "./context/UIContext"

import App from "./app"

document.title = "PERN-tss"
ReactDOM.render(
    <React.StrictMode>
        <UIProvider>
            <App />
        </UIProvider>
    </React.StrictMode>
, document.getElementById("root"))