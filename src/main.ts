import { EventEmitter } from 'events'

import WindowManager from './managers/WindowManager'
import NetManager from './managers/NetManager'
import BackManager from './managers/BackManager'

// 前端管理器
export default class FrontManager extends EventEmitter {
    private window: any;
    private net: NetManager;
    private back: any;
    constructor() {
        super()
        this.window = new WindowManager()
        this.net = new NetManager()
        this.back = new BackManager()
    }
    public init() {
        this.window.init()
        // this.data.net.init()
        this.back.init()
    }
    public start() {
        this.window.start()
        this.window.on('RECV_FROM_RENDERER', (bag: any) => { // 前端有数据返回
            if (bag.to == 'b') {
                // console.log('[DEBG]转发(B<=R)：', bag) // 生产环境下请注释掉
                this.net.send(bag)
                return
            }
        })
        // this.data.net.connect('back')
        this.net.on('recv', (bag: any) => { // 收到后端消息
            // console.log('[DEBG]自后端接收：', bag) // 生产环境下请注释掉
            if (bag.to == 'r') {
                // console.log('[DEBG]转发(B=>R)：', bag) // 生产环境下请注释掉
                this.window.send(bag)
            }
        })
        this.net.start()
        this.back.start()
    }
}
let front: FrontManager = new FrontManager()
front.init()
front.start()