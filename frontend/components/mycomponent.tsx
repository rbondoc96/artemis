import React, {FC} from "react"

interface ComponentProps {
    message?: string;
    children: JSX.Element | string | number;
}

export default function Component(props: ComponentProps) {

    return(
        <div>
            {props.message && <span>{props.message}</span>}
            <span>{props.children}</span>
        </div>
    )
}