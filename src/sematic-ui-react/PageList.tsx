import * as React from 'react'
import Page from "./Page";
import { Grid, GridRow } from 'semantic-ui-react'
/**
 * 页面列表（较长）
 */

export default class PageList extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let pages = this.props.data.pages.map((page: any, index: number) => {
            if (index == this.props.data.pages.length - 1) {
                return <GridRow style={{ paddingTop: 0 + 'px' }}>
                    <Page key={index} data={page} isDisabled={false} />
                </GridRow>
            } else {
                return <GridRow style={{ paddingTop: 0 + 'px' }}>
                    <Page key={index} data={page} isDisabled={true} />
                </GridRow>
            }
        })
        return <Grid style={{ height: 100 + '%', width: 100 + '%', margin: 0 + 'px' }}>{pages}</Grid>
    }
}