import 'semantic-ui-css/semantic.min.css'
import '../normal.sass'

import React, { useState } from 'react';
import { Splash } from "./Splash"
import { Header } from "./Header";
import { Console } from "./Console"
import { Game } from "./Game";
// 初始模式：Splash
// 游戏模式：Header + Game
// 终端模式：Header + Console
export default function App(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (data.isConsole) { // 终端优先级压倒一切
        document.body.style.backgroundColor = "#1b1c1d"
        return (
            <>
                <div>
                    <Header data={data} style={style} />
                </div>
                <div style={{ flexGrow: 1, overflowX: "hidden" }}>
                    <Console data={data} style={style} />
                </div>
            </>
        );
    } else if (!data.isLoaded) { // 加载界面
        document.body.style.backgroundColor = "#fff"
        return (
            <Splash data={data} style={style} />
        );
    } else { // 加载界面
        document.body.style.backgroundColor = "#fff"
        return (
            <>
                <div>
                    <Header data={data} style={style} />
                </div>
                <div style={{ flexGrow: 1, overflowX: "hidden" }}>
                    <Game data={data} style={style} />
                </div>
            </>
        );
    }
}