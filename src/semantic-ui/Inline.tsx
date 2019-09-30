import React, { useState } from "react";

export function Item(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (['text', 't', 'h'].indexOf(data.type) != -1) {
        return (
            <Text data={data}></Text>
        )
    } else if (['button', 'b'].indexOf(data.type) != -1) {
        return (
            <Button data={data}></Button>
        )
    } else if (['divider'].indexOf(data.type) != -1) {
        return (
            <Divider data={data}></Divider>
        )
    } else if (['progress'].indexOf(data.type) != -1) {
        return (
            <Progress data={data}></Progress>
        )
    } else if (['input'].indexOf(data.type) != -1) {
        return (
            <Input data={data}></Input>
        )
    } else {
        return (
            <div>{JSON.stringify(data)}</div>
        )
    }
}
export function Text(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    return (
        <span className="text" style={style}>{data.value.text}</span>
    );
}
export function Link(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function click() {
        console.log("Clicked!");
    }
    // 输出
    return (
        <span className="link" style={style} onClick={click}>{data.text}</span>
    );
}
export function Button(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function click() {
        let bag = {
            type: 'BUTTON_CLICK',
            from: 'r',
            to: 'b',
            hash: data.value.hash
        }
        data.value.func(bag)
    }
    // 输出
    return (
        <span className="button" style={style} onClick={click}>{data.value.text}</span >
    );
}
export function Rate(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let itemList = []
    for (let i = 0; i < data.item.length; i++) {
        const element = data.item[i];
        itemList.push(<span key={i} onClick={() => { click(element) }}>{element}</span>)
    }
    // 事件处理
    function click(value: string) {
        console.log(value);
    }
    // 输出
    return (
        <span className="rate" style={style}>{itemList}</span>
    );
}
export function Progress(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    return (
        <span className="progress" style={style}>
            <span className="bar" style={style}></span>
        </span>
    );
}

export function Divider(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    return (
        <div className="divider">

        </div>
    );
}

export function Input(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function change(e: any) {
        let bag = {
            type: 'INPUT_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: data['value']
        }
        data.func(bag)
    }
    // 输出
    return (
        <input type="text"
            onChange={change}>
            {data.value.default}
        </input>
    );
}
