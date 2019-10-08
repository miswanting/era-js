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
    if (data.isConsole) {
        return (
            <>
                <Header data={data} style={{}} />
                <Console data={data} style={{}} />
            </>
        )
    } else if (data.isMenu) { // Splash界面
        return (
            <>
                <Header data={data} style={{}} />
                <System data={data} style={{}} />
            </>
        );
    } else if (!data.isLoaded) { // Splash界面
        return (
            <>
                <Header data={data} style={{}} />
                <Splash data={data} style={{}} />
            </>
        );
    } else {
        return (
            <>
                <Header data={data} style={{}} />
                <Game data={data} style={{}} />
            </>
        );
    }
}