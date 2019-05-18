import * as fs from 'fs'
import * as child_process from 'child_process'

import { EventEmitter } from 'events'

export default class BackManager extends EventEmitter {
    init() {
    }
    start(exec_file) {
        if (fs.existsSync(exec_file)) {
            var game = child_process.execFile(exec_file, { maxBuffer: 512 * 1024 })
        }
    }
}