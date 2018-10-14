import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Popup } from "semantic-ui-react";

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
        if (this.props.data.popup == '') {
            return <Button
                content={this.props.data.text}
                onClick={this.handleClick}
                size='tiny'
                color={this.props.data.color}
                compact
                disabled={this.props.data.disabled}
            />
        } else {
            return <Popup trigger={
                <Button
                    content={this.props.data.text}
                    onClick={this.handleClick}
                    size='tiny'
                    color={this.props.data.color}
                    compact
                    disabled={this.props.data.disabled}
                />
            }
                content={this.props.data.popup}
                position='top center'
                size='tiny'
            />
        }

    }
}