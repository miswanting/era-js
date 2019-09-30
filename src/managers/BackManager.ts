import * as fs from 'fs'
import * as child_process from 'child_process'

import { EventEmitter } from 'events'

export default class BackManager extends EventEmitter {
    public init() { }
    public start(exec_file) {
        if (fs.existsSync(exec_file)) {
            child_process.exec(exec_file);
        }
    }
}