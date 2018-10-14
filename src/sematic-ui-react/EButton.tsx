import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button } from "semantic-ui-react";

/**
 * 行
 */
export default class EButton extends React.Component<{ data: any }, {}> {
    handleClick = () => {
        let bag = {
            type: 'BUTTON_CLICK',
            from: 'r',
            to: 'b',
            hash: this.props.data.hash
        }
        this.props.data.func(bag)
    }
    render() {
        return <Button
            content={this.props.data.text}
            onClick={this.handleClick}
            size='tiny'
            compact
            disabled={this.props.data.disabled}
        />
    }
}