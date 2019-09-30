import React, { useState, useEffect } from 'react';

export function Game(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    useEffect(() => {
        let e = document.getElementsByClassName('container')[0]
        e.scrollTop = e.scrollHeight;
    });
    let pages = data.pages.children.map((page: any, i: number) => {
        if (i == data.pages.children.length - 1) {
            return <Segment data={page} key={Math.random()} />
        }
    })
    for (let i = 0; i < data.pages.children.length; i++) {
        const page = data.pages.children[i];
        pages.push(<Segment data={page} key={Math.random()} />)
    }
    return (
        <>
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