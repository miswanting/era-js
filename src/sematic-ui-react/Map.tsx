import * as React from 'react'
import { Delaunay } from "d3-delaunay"
import { polygonCentroid } from 'd3'
export default class Map extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props)

    }
    componentDidMount() {
        const canvas: any = this.refs.canvas
        const ctx: any = canvas.getContext("2d")
        const points = []
        const n = 1000
        for (let i = 0; i < n; i++) {
            // let x = Math.random() * window.innerWidth
            // let y = Math.random() * window.innerHeight
            let x = window.innerWidth / 2 + Math.random()
            let y = window.innerHeight / 2 + Math.random()
            points.push([x, y])
        }
        document.getElementById('root').style.overflowY = 'hidden'
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        function loop() {
            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath()
            voronoi.render(ctx)
            // delaunay.renderPoints(ctx);
            ctx.strokeStyle = "red";
            ctx.stroke()
            ctx.beginPath()
            for (let j = 0; j < n; j++) {
                var cvt: [number, number][] = []
                for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
                    var [x, y] = voronoi.cellPolygon(j)[k]
                    cvt.push([x, y])
                }
                const [x0, y0] = [points[j][0], points[j][1]];
                const [x1, y1] = [points[j][0], points[j][1]] = polygonCentroid(cvt);
                ctx.moveTo(x0, y0)
                ctx.lineTo(x1, y1)
            }
            ctx.strokeStyle = "black";
            ctx.stroke();
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
        // for (let i = 0; i < 500; i++) {

        // }

        window.onresize = () => {
            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            ctx.beginPath()
            delaunay.renderPoints(ctx);
            ctx.fill()
            ctx.beginPath()
            voronoi.render(ctx)
            ctx.stroke()
        }
    }
    componentDidUpdate() {
    }

    render() {
        return <canvas ref="canvas" width={400} height={300} />
    }
}