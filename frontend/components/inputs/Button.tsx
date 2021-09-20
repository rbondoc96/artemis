import React from "react"

import BSButton from "react-bootstrap/Button"

import "../../styles/inputs/button.scss"

interface ButtonProps {
    children: JSX.Element | string
    href?: string
    primary?: boolean
    secondary?: boolean
    tertiary?: boolean
    outlined?: boolean
}

export default function Button(props: ButtonProps) {

    let classes = ["button"]
    if(props.primary) {
        if(props.outlined) {
            classes.push("button-primary--outlined")
        } else {
            classes.push("button-primary")
        }
    } else if(props.secondary) {
        if(props.outlined) {
            classes.push("button-secondary--outlined")
        } else {
            classes.push("button-secondary")
        }
    } else if(props.tertiary) {
        if(props.outlined) {
            classes.push("button-tertiary--outlined")
        } else {
            classes.push("button-tertiary")
        }
    } else {
        if(props.outlined) {
            classes.push("button-primary--outlined")
        } else {
            classes.push("button-primary")
        }
    }

    return(
        <div className={classes.join(" ")}>
            <BSButton href={props.href || undefined}>
                {props.children}
            </BSButton>
        </div>
    )
}