import * as React from 'react'
import { Delaunay } from "d3-delaunay"
export default class Map extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props)

    }
    componentDidMount() {
        const canvas: any = this.refs.canvas
        const ctx: any = canvas.getContext("2d")
        const points = []

        for (let i = 0; i < 100; i++) {
            let x = parseInt((Math.random() * 400).toFixed(0))
            let y = parseInt((Math.random() * 300).toFixed(0))
            points.push([x, y])
        }
        const delaunay = Delaunay.from(points);
        const voronoi = delaunay.voronoi([0, 0, 400, 300]);
        ctx.beginPath()
        delaunay.render(ctx);
        delaunay.renderPoints(ctx);
        ctx.fill()
        ctx.beginPath()
        voronoi.render(ctx)
        ctx.stroke()
    }

    render() {
        return <div>
            <canvas ref="canvas" width={400} height={300} />
        </div>
    }
}