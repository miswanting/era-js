import "./span-charm.sass"

import React, { useState } from 'react';

import { Header } from "./Header";
import { Console } from "./Console"
import { System } from "./System"
import { Splash } from "./Splash"
import { Game } from "./Game";

/**
 * 应用根类
 * 
 * Console
 * System: C
 * Splash: C, S
 * Editor: C, S
 * Game: C, S
 */
export default function App(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let tmp = [
        <Header data={data} style={{}} />,
        <Toast data={data} style={{}} />,
    ]

    if (data.isConsole) {
        tmp.push(<Console data={data} style={{}} />)
    } else if (data.isMenu) { // Splash界面
        tmp.push(<System data={data} style={{}} />)
    } else if (!data.isLoaded) { // Splash界面
        tmp.push(<Splash data={data} style={{}} />)
    } else {
        tmp.push(<Game data={data} style={{}} />)
    }
    return (<>{tmp}</>)
}
}