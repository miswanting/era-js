import { EventEmitter } from 'events'
import { app, Menu, ipcMain, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
export default class WindowManager extends EventEmitter {
    private data = {
        win: null,
        menu: null
    }
    constructor() {
        super()
        this.data = {
            win: null,
            menu: null
        }
    }
    public init() { }
    public start() {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
        app.on('ready', () => { // 启动程序
            this.data.win = new BrowserWindow({
                width: 1024, height: 768,
                webPreferences: {
                    nodeIntegration: true,
                    nodeIntegrationInWorker: true
                }
            })
            this.data.win.webContents.openDevTools() // 生产环境下请注释掉
            this.data.win.loadFile('dist/index.html')
            Menu.setApplicationMenu(null)
            this.data.win.on('closed', () => {
                this.data.win = null
                console.log('[DEBG]检测到窗口关闭');
                app.quit()
            })
            this.emit('window-ready')
        })
        app.on('window-all-closed', () => { // 窗口已全关闭
            // 退出程序
            console.log('[DEBG]检测到窗口全部关闭');
            let bag: any = {
                type: 'exit',
                from: 'm',
                to: 'b'
            }
            this.emit('recv', bag)
            app.quit()
        })
        ipcMain.on('bag', (event: any, data: String) => {
            let piece = data.toString().split('}{')
            for (let i = 0; i < piece.length; i++) {
                if (i != piece.length - 1) {
                    piece[i] += '}'
                }
                if (i != 0) {
                    piece[i] = '{' + piece[i]
                }
            }
            for (let i = 0; i < piece.length; i++) {
                console.log('[DEBG]自前端接收：', piece[i]); // 生产环境下请注释掉
                let bag = JSON.parse(piece[i])
                this.emit('RECV_FROM_RENDERER', bag)
            }
        })
    }
    public send(bag) {
        this.data.win.webContents.send('bag', JSON.stringify(bag))
    }
}