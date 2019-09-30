/**
 * 文件
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { EventEmitter } from 'events'
import App from "../sematic-ui-react/App";
import * as d3 from 'd3'
import * as SimplexNoise from 'simplex-noise'

/**
 * 显示管理器
 * 管理窗口的显示内容，如页面类型等
 */
export default class DisplayManager extends EventEmitter {
    private data = {

    }
    /**
     * 显示管理器
     * 管理窗口的显示内容，如页面类型等
     * 
     */
    public init() {

    }
    public push() {

    }
    public update(app) { // 刷新前端
        ReactDOM.render(
            <App data={app} />,
            document.getElementById('root')
        )
    }
    /**
     * name
     */
    public name() {

    }
}
