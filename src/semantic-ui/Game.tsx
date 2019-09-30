import React, { useState } from 'react';

export function Game(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (
        <>
            {/* <Header data={data.title} style={{}} />
            <Game data={data} style={{}} /> */}
        </>
    );
}
function Segment(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (
        <div></div>
    )
}