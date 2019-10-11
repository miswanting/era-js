import "./span-charm.sass"
import { remote } from 'electron'
import React, { useState } from 'react';

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

export function Header(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    function toggleDevTools() {
        if (remote.getCurrentWindow().webContents.isDevToolsOpened) {
            remote.getCurrentWindow().webContents.closeDevTools()
        } else {
            remote.getCurrentWindow().webContents.openDevTools();
        }
    }
    function minWindow() {
        remote.getCurrentWindow().minimize();
    }
    function maxWindow() {
        if (!remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().maximize();
        } else {
            remote.getCurrentWindow().unmaximize();
        }
    }
    function closeWindow() {
        remote.getCurrentWindow().close();
    }
    if (data.isConsole || data.isMenu || !data.isLoaded) {
        return (
            <header>
                <nav>
                    <span className="quick" onMouseUp={toggleDevTools}>
                        <FontAwesomeIcon icon={faTools} />
                    </span>
                    <span className="title" />
                    <span className="min" onMouseUp={minWindow}>
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                    <span className="max" onMouseUp={maxWindow}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className="close" onMouseUp={closeWindow}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </nav>
            </header>
        )
    } else {
        let menus = [
            {
                name: "系统",
                children: [{
                    name: "打开"
                }]
            },
            {
                name: "编辑"
            },
            {
                name: "显示"
            },
            {
                name: "帮助"
            }
        ]
        let d_menus = menus.map((menu) => {
            if ('children' in menu) {
                let d_submenus = menu.children.map((submenu) => {
                    return <span className="item">{submenu.name}</span>
                })
                return <div className="menu">
                    <span className="name">{menu.name}</span>
                    <div className="list">
                        {d_submenus}
                    </div>
                </div>
            } else {
                return <div className="menu">
                    <span className="name">{menu.name}</span>
                </div>
            }
        })
        return (
            <header>
                <nav>
                    <span className="quick">
                        <FontAwesomeIcon icon={faTransgenderAlt} />
                    </span>
                    <span className="quick" onMouseUp={toggleDevTools}>
                        <FontAwesomeIcon icon={faTools} />
                    </span>
                    <span className="quick">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className="title">
                        {data.title}
                    </span>
                    <span className="min" onMouseUp={minWindow}>
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                    <span className="max" onMouseUp={maxWindow}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className="close" onMouseUp={closeWindow}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </nav>
                <nav>
                    {d_menus}
                </nav>
            </header>
        );
    }
}

export function Toast(props: any) {
    let l = [" "]
    let items = l.map((text) => {
        return <div className="item">{text}<span>×</span></div>
    })
    return (<>
        <div className="toast">
            <div style={{ position: "absolute" }}>
                {items}
            </div>
        </div>
    </>)
}