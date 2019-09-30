import React, { useState } from 'react';
import { Header } from "./Header";
import { Main } from "./Main";
export default function App(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (
        <>
            <Header data={data.title} style={{}} />
            <Main data={data} style={{}} />
        </>
    );
}