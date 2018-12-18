import * as React from 'react'
import * as Blockly from '../blockly/blockly_compressed.js'
import * as Blocks from '../blockly/blocks_compressed.js'
import * as Python from '../blockly/python_compressed.js'
export default class Code extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        var toolbox = React.createElement('xml', {
            id: "toolbox",
            style: "display: none"
        },
            React.createElement('block', { type: "controls_if" }),
            React.createElement('block', { type: "controls_repeat_ext" }),
            React.createElement('block', { type: "logic_compare" }),
            React.createElement('block', { type: "math_number" }),
            React.createElement('block', { type: "math_arithmetic" }),
            React.createElement('block', { type: "text" }),
            React.createElement('block', { type: "text_print" }),
        )
        var workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });
    }
    render() {
        return <>
            <div
                id="blocklyDiv"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}>
            </div>
        </>

    }
}