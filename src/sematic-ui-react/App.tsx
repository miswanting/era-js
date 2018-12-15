import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Xcover from './Xcover'
import Console from './Console'
import PageList from './PageList'
/**
 * 窗口
 */
export default class App extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        if (!this.props.data.isLoaded) {
            if (this.props.data.isConsole) {
                return <>
                    <Xcover data={this.props.data} />
                    <Console data={this.props.data} />
                </>
            }
            return <Xcover data={this.props.data} />
        } else {
            if (this.props.data.isConsole) {
                return <>
                    <PageList data={this.props.data} />
                    <Console data={this.props.data} />
                </>
            }
            return <PageList data={this.props.data} />
        }
    }
}