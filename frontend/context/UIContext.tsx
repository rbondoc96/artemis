import React, {createContext, useState} from "react"

export function getWindowSize(width: number|string): string {
    if(width >= 1400) {
        return "xxl"
    } else if(width >= 1200) {
        return "xl"
    } else if(width >= 992) {
        return "lg"
    } else if(width >= 768) {
        return "md"
    } else if(width >= 576) {
        return "sm"
    } else {
        return "xs"
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

interface UIProps {
    children: JSX.Element;
}

export function UIProvider(props: UIProps) {

    const [size, setSize] = useState(getWindowSize(window.innerWidth))
    const [theme, setTheme] = useState(getThemeFromTime())

    return(
        <UIContext.Provider value={{
            uiSize: [size, setSize],
            uiTheme: [theme, setTheme]
        }}>
            {props.children}
        </UIContext.Provider>
    )
}