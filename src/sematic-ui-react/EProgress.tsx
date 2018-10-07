import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Progress } from "semantic-ui-react";

/**
 * 标题
 * BUG: <Header> 不应该位于 <p> 中。
 */
export default class EProgress extends React.Component<{ data: any }, {}> {
    render() {
        return <Progress
            value={this.props.data.now}
            total={this.props.data.max}
            size='small'
            indicating
            className={''}
            style={{
                display: 'inline-grid',
                width: this.props.data.length,
                margin: 0 + 'px',
                minWidth: 0 + 'px'
            }}
        />
    }
}