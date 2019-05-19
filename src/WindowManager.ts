import { EventEmitter } from 'events'
import { app, Menu, ipcMain, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
export default class WindowManager extends EventEmitter {
    private data = {
        win: null,
        menu: null
    }
    public init() {
    }
    public start(t) {
        app.on('ready', () => { // 启动程序
            this.data.win = new BrowserWindow({
                width: 1024, height: 768,
                webPreferences: {
                    nodeIntegrationInWorker: true
                }
            })
            this.data.win.loadFile('src/index.html')
            // win.webContents.openDevTools() // 生产环境下请注释掉
            // var menu_tmp = this.get_menu.bind(this)
            this.data.menu = Menu.buildFromTemplate(this.get_menu(this.data, t))
            Menu.setApplicationMenu(this.data.menu)
            // Menu.setApplicationMenu(null)
            this.data.win.on('closed', () => {
                this.data.win = null
                console.log('[DEBG]检测到窗口关闭');
                app.quit()
            })
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
                this.emit('recv', bag)
            }
        })
    }
    menu_click(bag) {
        console.log(bag);
        () => {
            this.emit('recv', bag)
        }
    }

    public send(bag) {
        this.data.win.webContents.send('bag', JSON.stringify(bag))
    }
    private get_menu = (): any => {
        let tmp = [
            {
                label: '游戏',
                submenu: [
                    {
                        label: '启动游戏脚本',
                        enabled: false
                    },
                    { type: 'separator' },
                    {
                        label: '退出',
                        enabled: false
                    }
                ]
            },
            {
                label: '编辑器',
                submenu: [
                    {
                        label: '头像编辑器',
                        id: 'avantar-editor',
                        type: 'checkbox',
                        click() {
                            let bag: any = {
                                type: 'avantar_editor',
                                value: Menu.getApplicationMenu().getMenuItemById('avantar-editor').checked,
                                from: 'm',
                                to: 'b'
                            }
                            t(bag)
                        }
                    }, {
                        label: '地图编辑器',
                        id: 'map-editor',
                        type: 'checkbox',
                        click() {
                            let bag: any = {
                                type: 'map_editor',
                                value: Menu.getApplicationMenu().getMenuItemById('map-editor').checked,
                                from: 'm',
                                to: 'b'
                            }
                            t(bag)
                        }
                    }, {
                        label: '图形化代码编辑器',
                        id: 'code-editor',
                        type: 'checkbox',
                        click() {
                            let bag: any = {
                                type: 'code_editor',
                                value: Menu.getApplicationMenu().getMenuItemById('code-editor').checked,
                                from: 'm',
                                to: 'b'
                            }
                            t(bag)
                        }
                    }
                ]
            }, {
                label: '调试器',
                submenu: [
                    {
                        label: '前端调试器',
                        click() {
                            console.log(this);
                            data.win.webContents.openDevTools()
                        }
                    }
                ]
            }, {
                label: '窗口',
                role: 'window',
                submenu: [
                    {
                        label: '放大',
                        role: 'zoomin'
                    }, {
                        label: '缩小',
                        role: 'zoomout'
                    }, {
                        label: '重置',
                        role: 'resetzoom'
                    }
                ]
            }, {
                label: '帮助',
                role: 'help',
                submenu: [
                    {
                        label: '文档',
                        enabled: false
                    },
                    {
                        label: '教程',
                        enabled: false
                    },
                    { type: 'separator' },
                    {
                        label: '讨论/建议/反馈Bug',
                        enabled: false
                    },
                    { type: 'separator' },
                    {
                        label: '检查更新',
                        enabled: false
                    },
                    { type: 'separator' },
                    {
                        label: '关于',
                        role: 'about',
                        enabled: false
                    }
                ]
            }
        ]
        return tmp
    }
}
