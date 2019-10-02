import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react'

import { Block } from "./Block"

export function Game(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    useEffect(() => {
        let e = document.getElementById('pagelist')
        // let e = document.getElementsByClassName('column')[0]
        e.scrollTop = e.scrollHeight;
    });
    let pages = data.pages.children.map((page: any, i: number) => {
        if (i == data.pages.children.length - 1) {
            return <Page data={page} key={Math.random()} />
        } else {
            return <Page data={page} key={Math.random()} />
        }
    })
    return (
            <div className={'column'}>
                {pages}
            </div>
    );
}
function Page(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let blocks = []
    for (let i = 0; i < data.children.length; i++) {
        const block = data.children[i];
        blocks.push(<Block key={i} data={block} />)
    }
    return (
        <Segment disabled={data.isDisabled}>
            {blocks}
        </Segment>
    )
}