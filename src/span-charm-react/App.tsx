import "./span-charm.sass"

import React, { useState } from 'react';
// import { Splash } from "./Splash"
import { Header } from "./Header";
// import { Console } from "./Console"
import { Game } from "./Game";
export default function App(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (data.isConsole) {
        return (
            <></>
        )
    } else if (!data.isLoaded) { // Splash界面

    } else {
        return (
            <>
                <Header data={data.title} style={{}} />
                <Game data={data} style={{}} />
            </>
        );
    }
}