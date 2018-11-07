import * as React from 'react'

/**
 * 行
 */
export default class Text extends React.Component<{ data: any }, {}> {
    render() {
        var text_style = {}
        if (this.props.data.color != 'default') {
            text_style['color'] = this.props.data.color
        }
        if (this.props.data.color != 'default') {
            text_style['background'] = this.props.data.bcolor
        }
        return <span style={text_style}>
            {this.props.data.text}
        </span>
    }
}