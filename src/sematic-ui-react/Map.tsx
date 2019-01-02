import * as React from 'react'
import { Delaunay } from "d3-delaunay"
import { polygonCentroid } from 'd3'
import { lookup } from 'dns';
export default class Map extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props)

    }
    componentDidMount() {
        // 初始化
        const canvas: any = this.refs.canvas
        const ctx: any = canvas.getContext("2d")
        const n = 10000
        const points = []
        document.getElementById('root').style.overflowY = 'hidden'
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        // 主流程
        randomPoints() // 随机点
        relaxPoints() // 分散点
        testRender()
        // drawVoronoi() // 分散点
        //函数
        function randomPoints() {
            for (let i = 0; i < n; i++) {
                let x = Math.random() * ctx.canvas.width
                let y = Math.random() * ctx.canvas.height
                // let x = window.innerWidth / 2 + Math.random()
                // let y = window.innerHeight / 2 + Math.random()
                points.push([x, y])
            }
        }
        function relaxPoints() {
            for (let i = 0; i < 10; i++) {
                const delaunay = Delaunay.from(points);
                const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                for (let j = 0; j < n; j++) {
                    var cvt: [number, number][] = []
                    for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
                        var [x, y] = voronoi.cellPolygon(j)[k]
                        cvt.push([x, y])
                    }
                    [points[j][0], points[j][1]] = polygonCentroid(cvt);
                }
            }
        }
        function drawVoronoi() {
            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath()
            voronoi.render(ctx)
            // delaunay.renderPoints(ctx);
            ctx.strokeStyle = "red";
            ctx.stroke()
            ctx.beginPath()
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        function testRender() {
            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
            ctx.beginPath()
            voronoi.renderCell(55, ctx)
            ctx.strokeStyle = "red";
            ctx.stroke()
            var l = delaunay.neighbors(55)
            ctx.beginPath()
            while (l.next().done == false) {
                voronoi.renderCell(l.next().value, ctx)
            }
            ctx.strokeStyle = "blue";
            ctx.stroke()
            console.log();
        }
        // var i = 0
        // function loop() {
        //     const delaunay = Delaunay.from(points);
        //     const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
        //     voronoi.renderCell(i, ctx)
        //     requestAnimationFrame(loop)
        // }
        // requestAnimationFrame(loop)
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