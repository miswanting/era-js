import React, { useState } from 'react';

export function Header(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    if (data.isConsole) {
        return (
            <header>
                <Navbar data={data} />
            </header>
        )
    } else if (!data.isLoaded) { // Splash界面
        return (
            <header>
                <Navbar data={data} />
            </header>
        );
    } else {
        return (
            <header>
                <Navbar data={data} />
            </header>
        );
    }
}
function Navbar(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    return (
        <nav>
            <div className="nav">
                <span>
                    <AppIcon />
                    <QuickBar />
                </span>
                <TitleBar data={data} />
                <SystemBar />
            </div>
            <MenuBar />
        </nav>
    );
}
function AppIcon(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    return (
        <span className="app-icon">
            =
        </span>
    );
}
function QuickBar(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    return (
        <span className="quick">
            <span className="menu">≡</span>
        </span>
    );
}
function TitleBar(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    return (
        <span className="title">{data.title}</span>
    );
}
function SystemBar(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    return (
        <span className="system">
            <span className="min">●</span>
            <span className="max">●</span>
            <span className="close">●</span>
        </span>
    );
}
function MenuBar(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    return (
        <div>
            <span className="menu">系统</span>
            <span className="menu">编辑</span>
            <span className="menu">显示</span>
            <span className="menu">帮助</span>
        </div>
    );
}