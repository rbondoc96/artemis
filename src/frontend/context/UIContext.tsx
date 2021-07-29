import React, {createContext, useState} from "react"

export function getWindowSize(width: number|string): string {
    if(width > 1000) {
        return "large"
    } else if(width > 480) {
        return "medium"
    } else {
        return "small"
    }
}

export function getThemeFromTime(): string {
    let hours = new Date().getHours()
    if(hours < 17 && hours > 6) {
        return "light"
    } else {
        return "dark"
    }
}

export const UIContext: React.Context<any> = createContext({})
UIContext.displayName = "UIContext"

export function UIProvider({children}) {

    const [size, setSize] = useState(getWindowSize(window.innerWidth))
    const [theme, setTheme] = useState(getThemeFromTime())

    return(
        <UIContext.Provider value={{
            uiSize: [size, setSize],
            uiTheme: [theme, setTheme]
        }}>
            {children}
        </UIContext.Provider>
    )
}