import * as Net from "net"
import { EventEmitter } from 'events'
import { net } from "electron";

/**
 * # 接口：iNetManager
 */
interface iNetManager extends EventEmitter {
    start(): void;  // 搭建服务器
    send(data: object): void;  // 发送
    isConnected(): boolean;  // 是否连接
    close(): void;  // 关闭
}

/**
 * # NetManager
 */
export default class NetManager extends EventEmitter implements iNetManager {

    /**
     * # core
     * 存放网络核心的容器。
     */
    private core: iNetCore;
    constructor() {
        super()
    }

    /**
     * # start
     */
    public start(): void {
        this.core = new BackCore()
        this.core.on('connection', (data) => {
            this.emit('connection', data)
        })
        this.core.on('close', (data) => {
            this.emit('close', data)
        })
        this.core.on('recv', (data) => {
            this.emit('recv', data)
        })
        this.core.start()
    }

    /**
     * # send
     * 发送数据
     */
    public send(data: object): void {
        if (this.isConnected) {
            this.core.send(data)
        }
    }

    /**
     * # isConnected
     * 储存当前连接状态。
     */
    public isConnected(): boolean {
        return this.core.isConnected
    }

    /**
     * # close
     * 停止侦听
     */
    public close(): void {
        this.core.close()
    }
}

/**
 * # 接口：iNetCore
 */
interface iNetCore extends EventEmitter {
    isConnected: boolean;  // 是否连接
    start(): void;  // 搭建服务器
    send(data: object): void;  // 发送
    close(): void;  // 关闭
}

/**
 * # BackCore
 */
class BackCore extends EventEmitter implements iNetCore {
    public PORT: number = 11994;
    private server: Net.Server;
    private socket: Net.Socket;
    public isConnected: boolean = false;
    constructor() {
        super()
    }

    /**
     * # start
     */
    public start(): void {
        this.server = new Net.Server((s: Net.Socket) => {
            this.socket = s
            console.log('[FINE]检测到连接请求！')
            this.socket.on('data', (data) => {
                let bags = parseData(data)
                for (let i = 0; i < bags.length; i++) {
                    console.log('[DEBG]自后端接收：', bags[i]) // 生产环境下请注释掉
                    this.emit('recv', bags[i])
                }
            })
            this.socket.on('end', () => {
                console.log('[DEBG]连接断开！')
            })
            this.socket.on('error', (err) => {
                console.log(err)
            })
        })
        this.server.on('connection', (data) => {
            this.isConnected = true
            this.emit('connection', data)
        })
        this.server.on('close', (data) => {
            this.isConnected = false
            this.emit('close', data)
        })
        console.log('[DEBG]服务器监听11994端口中…')
        this.server.listen(this.PORT)
    }

    /**
     * # send
     */
    public send(data: object): void {
        if (this.isConnected) {
            console.log('[DEBG]发送至后端：', data) // 生产环境下请注释掉
            this.socket.write(JSON.stringify(data))
        }
    }

    /**
     * # isConnected
     * 储存当前连接状态。
     */
    // public isConnected(): boolean {
    //     return this.socket.connecting
    // }

    /**
     * # close
     */
    public close(): void {
        this.server.close()
    }
}

/**
 * # parseData
 */
function parseData(data: Buffer | string): Array<object> {
    let rawBags = data.toString().split('}{')
    for (let i = 0; i < rawBags.length; i++) {
        if (i != 0) {
            rawBags[i] = '{' + rawBags[i]
        }
        if (i != rawBags.length - 1) {
            rawBags[i] += '}'
        }
    }
    let bags = []
    for (let i = 0; i < rawBags.length; i++) {
        bags.push(JSON.parse(rawBags[i]))
    }
    return bags
}
// export default class NetManager extends EventEmitter {
//     private data;
//     constructor() {
//         super()
//         this.data = {
//             back: null,
//             server: null
//         }
//     }
//     public init() { // 配置侦听器
//     }
//     public connect(type: string) {
//         if (type == 'back') {
//             this.data.back = {
//                 target: new BackNode(),
//                 connected: false
//             }
//             this.data.back.target.on('recv', (bag: any) => {
//                 this.emit('RECV_FROM_BACK', bag)
//             })
//         } else if (type == 'server') {
//             this.data.server = {
//                 target: new ServerNode(),
//                 connected: false
//             }
//             this.data.server.target.on('recv', (bag: any) => {
//                 this.emit('RECV_FROM_SERVER', bag)
//             })
//         }
//     }
//     public start() { // 激活管理器
//         this.data.back.target.start()
//     }
//     public sendBack(bag) { // 向后端发送数据
//         this.data.back.target.send(bag)
//     }
//     public sendUp(bag) { // 向服务器发送数据

//     }
//     public close() {
//         this.data.back.close()
//     }
// }
// interface NetNode {
//     init(): void;
//     start(): void;
//     send(bag: object): void;
// }
// class BackNode extends EventEmitter implements NetNode { // 后端
//     private data = {
//         server: null,
//         connection: null,
//         connected: false
//     }
//     constructor() {
//         super()
//     }
//     public init() { }
//     public start() {
//         this.data.server = Net.createServer(
//             (conn) => {
//                 this.data.connection = conn
//                 console.log('[FINE]检测到连接请求！')
//                 this.data.connected = true
//                 var bag = { 'type': 'connected', 'from': 'm', 'to': 'r' }
//                 this.emit('recv', bag)
//                 this.data.connection.on('data', (data: Buffer) => {
//                     // 分离、解析后转发
//                     let bags = data2bag(data)
//                     for (let i = 0; i < bags.length; i++) {
//                         this.emit('recv', bags[i])
//                     }
//                 })
//                 this.data.connection.on('end', () => {
//                     console.log('[DEBG]连接断开！')
//                 })
//                 this.data.connection.on('error', (err) => {
//                     console.log(err);
//                     // app.quit()
//                 })
//             }
//         )
//         this.data.server.on('error', (err) => {
//             throw err
//         })
//         this.data.server.listen(11994, () => {
//             console.log('[DEBG]服务器监听11994端口中…');
//         });
//     }
//     public send(bag) { // 向后端发送
//         if (this.data.connected) {
//             console.log('[DEBG]发送至后端：', bag) // 生产环境下请注释掉
//             this.data.connection.write(JSON.stringify(bag))
//         }
//     }
//     public close() { }
// }
// class ServerNode extends EventEmitter implements NetNode { // 多人游戏服务器
//     private data;
//     constructor() {
//         super()
//         this.data = {
//             target: null,
//             connection: null,
//             connected: false
//         }
//     }
//     public init() { }
//     public start() { }
//     public send() { }
// }
// function data2bag(data: Buffer) {
//     let piece = data.toString().split('}{')
//     for (let i = 0; i < piece.length; i++) {
//         if (i != piece.length - 1) {
//             piece[i] += '}'
//         }
//         if (i != 0) {
//             piece[i] = '{' + piece[i]
//         }
//     }
//     let bags = []
//     for (let i = 0; i < piece.length; i++) {
//         let bag = JSON.parse(piece[i])
//         bags.push(bag)
//     }
//     return bags
// }