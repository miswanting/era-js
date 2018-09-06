import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ipcRenderer } from "electron";
// 前端选择
// antd
// import App from "./antd/App";
// sematic-ui-react
import App from "./sematic-ui-react/App";




/**
 * 侦听鼠标点击
 */
document.getElementById('root').addEventListener("mouseup", (e) => {
    console.log('[DEBG]鼠标点击：', e.which);
    let bag = {
        type: 'MOUSE_CLICK',
        from: 'r',
        to: 'b',
        value: e.which
    }
    send(bag)
})

/**
 * 接受信息
 */
ipcRenderer.on('bag', (event: any, data: string) => {
    let piece = data.toString().split('}{')
    for (let i = 0; i < piece.length; i++) {
        if (i != piece.length - 1) {
            piece[i] += '}'
        }
        if (i != 0) {
            piece[i] = '{' + data[i]
        }
    }
    for (let i = 0; i < piece.length; i++) {
        console.log('[DEBG]接收：', piece[i]);
        let bag: any = JSON.parse(piece[i])
        parseBag(bag)
    }
})

/**
 * 发射信息
 * @param bag 
 */
function send(bag: any) {
    console.log('[DEBG]发送：', JSON.stringify(bag));
    ipcRenderer.send('bag', JSON.stringify(bag))
}

function parseBag(bag: any) {
    if (bag.type == 'syn') {
        let ack: any = {
            type: 'ack',
            from: 'r',
            to: 'b',
            value: bag
        }
        send(ack)
        let syn: any = {
            type: 'syn',
            from: 'r',
            to: 'b',
        }
        send(syn)
    } else if (bag.type == 'ack') {
        console.log('[DONE]与 BACK 握手完成！')
        console.log('[DEBG]开始加载游戏数据！')
        app.isConnected = true
        update()
    } else if (bag.type == 'LOAD_DONE') {
        console.log('[DONE]游戏数据加载完成！')
        app.isLoaded = true
        update()
    } else if (bag.type == 'title') {
        document.title = bag.value
    } else if (bag.type == 't') {
        if (app.pages.length == 0) {
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1
        if (bag.value == '') {
            app.pages[iPage].children.push({ type: 'line', children: [] })
        } else {
            if (app.pages[iPage].children.length == 0) {
                app.pages[iPage].children.push({ type: 'line', children: [] })
            }
            let iLine = app.pages[iPage].children.length - 1
            app.pages[iPage].children[iLine].children.push(bag)
        }
        update()
    } else if (bag.type == 'b') {
        if (app.pages.length == 0) {
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1
        if (app.pages[iPage].children.length == 0) {
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        let iLine = app.pages[iPage].children.length - 1
        bag.value.func = send
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'h') {
        if (app.pages.length == 0) {
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1
        if (app.pages[iPage].children.length == 0) {
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        let iLine = app.pages[iPage].children.length - 1
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'progress') {
        if (app.pages.length == 0) {
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1
        if (app.pages[iPage].children.length == 0) {
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        let iLine = app.pages[iPage].children.length - 1
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'page') {
        app.pages.push({ type: 'page', children: [] })
        update()
    } else if (bag.type == 'mode') {
        app.mode = bag.value
        update()
    } else if (bag.type == 'clear') {
        app.pages = []
        update()
    }
}
let tmp: any[] = []
let app = {
    isConnected: false,
    isLoaded: false,
    pages: tmp,
    mode: tmp
}
update()
function update() {
    ReactDOM.render(
        <App data={app} />,
        document.getElementById('root')
    )
}