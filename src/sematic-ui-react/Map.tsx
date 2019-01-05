import * as React from 'react'
import { Delaunay } from "d3-delaunay"
import * as d3 from 'd3'
import * as SimplexNoise from 'simplex-noise'
// var SimplexNoise = require('simplex-noise')
var Noise = require('noisejs')

export default class Map extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props)

    }
    componentDidMount() {
        // 初始化
        // const canvas: any = this.refs.canvas
        // const ctx: any = canvas.getContext("2d")
        const n = 10000
        const points = []
        document.getElementById('root').style.overflow = 'hidden'
        // ctx.canvas.width = window.innerWidth;
        // ctx.canvas.height = window.innerHeight;
        // 主流程
        randomPoints() // 随机点
        relaxPoints() // 分散点
        // testRender()
        svgRender()
        // var zx = 0, zy = 0, zs = 1
        // var zoom = zoom().on('zoom', zoomed);
        // select('canvas').call(zoom)
        // function zoomed() {
        //     zx = event.translate[0];
        //     zy = event.translate[1];
        //     zs = event.scale;
        //     container.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
        // }
        // drawVoronoi() // 分散点
        //函数
        function randomPoints() {
            for (let i = 0; i < n; i++) {
                let x = Math.random() * window.innerWidth
                let y = Math.random() * window.innerHeight
                // let x = window.innerWidth / 2 + Math.random()
                // let y = window.innerHeight / 2 + Math.random()
                points.push([x, y])
            }
        }
        function relaxPoints() {
            for (let i = 0; i < 10; i++) {
                const delaunay = Delaunay.from(points);
                const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight]);
                // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                for (let j = 0; j < n; j++) {
                    var cvt: [number, number][] = []
                    for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
                        var [x, y] = voronoi.cellPolygon(j)[k]
                        cvt.push([x, y])
                    }
                    [points[j][0], points[j][1]] = d3.polygonCentroid(cvt);
                }
            }
        }
        // function drawVoronoi() {
        //     const delaunay = Delaunay.from(points);
        //     const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
        //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //     ctx.beginPath()
        //     voronoi.render(ctx)
        //     // delaunay.renderPoints(ctx);
        //     ctx.strokeStyle = "red";
        //     ctx.stroke()
        //     ctx.beginPath()
        //     ctx.strokeStyle = "black";
        //     ctx.stroke();
        // }
        // function testRender() {
        //     var simplex = new SimplexNoise()
        //     // var noise = new Noise(Math.random());
        //     const delaunay = Delaunay.from(points);
        //     const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
        //     for (let i = 0; i < delaunay.points.length / 2; i++) {
        //         var x = delaunay.points[2 * i]
        //         var y = delaunay.points[2 * i + 1]
        //         ctx.beginPath()
        //         ctx.lineWidth = 0
        //         voronoi.renderCell(i, ctx)
        //         var value = simplex.noise2D(x * 0.003, y * 0.003)
        //         value = (value + 1) / 2
        //         value = value * value
        //         var r = 100, g = 100, b = 100
        //         value = parseInt((value * 256).toString())
        //         r = g = b = value
        //         if (value / 256 > 0.9) {
        //             r = g = b = 230
        //         } else if (value / 256 > 0.8) {
        //             r = g = b = 50
        //         } else if (value / 256 > 0.6) {
        //             r = 27, g = 122, b = 34
        //         } else if (value / 256 > 0.4) {
        //             r = 31, g = 192, b = 42
        //         } else if (value / 256 > 0.2) {
        //             r = 243, g = 245, b = 65
        //         } else if (value / 256 > 0.1) {
        //             r = 60, g = 81, b = 195
        //         } else {
        //             r = 25, g = 35, b = 93
        //         }
        //         ctx.fillStyle = `rgb(${r},${g},${b})`;
        //         ctx.fill()
        //     }
        // for (let x = 0; x < ctx.canvas.width; x++) {
        //     for (let y = 0; y < ctx.canvas.height; y++) {
        //         var value = simplex.noise2D(x * 0.01, y * 0.01)
        //         value = parseInt(((value + 1) / 2 * 256).toString())
        //         r = g = b = value
        //         ctx.fillStyle = `rgb(${r},${g},${b})`
        //         ctx.fillRect(x, y, 1, 1);
        //     }
        // }

        // var l = delaunay.neighbors(55)
        // ctx.beginPath()
        // while (l.next().done == false) {
        //     voronoi.renderCell(l.next().value, ctx)
        // }
        // ctx.fillStyle = '#f00';
        // ctx.fill()
        // }
        function svgRender() {
            var simplex = new SimplexNoise()
            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight]);
            var zoom = d3.zoom().on('zoom', zoomed)
            function zoomed() {
                var transform = d3.zoomTransform(this);
                d3.select('#viewport').attr("transform", transform.toString())
            }
            d3.select('#root')
                .append('svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight)
                .call(zoom)
                .append('g')
                .attr('id', 'viewport')
            for (let i = 0; i < delaunay.points.length / 2; i++) {
                var x = delaunay.points[2 * i]
                var y = delaunay.points[2 * i + 1]
                var value = simplex.noise2D(x * 0.003, y * 0.003)
                value = (value + 1) / 2
                value = value * value
                var r = 100, g = 100, b = 100
                value = parseInt((value * 256).toString())
                r = g = b = value
                if (value / 256 > 0.9) {
                    r = g = b = 230
                } else if (value / 256 > 0.8) {
                    r = g = b = 50
                } else if (value / 256 > 0.6) {
                    r = 27, g = 122, b = 34
                } else if (value / 256 > 0.4) {
                    r = 31, g = 192, b = 42
                } else if (value / 256 > 0.2) {
                    r = 243, g = 245, b = 65
                } else if (value / 256 > 0.1) {
                    r = 60, g = 81, b = 195
                } else {
                    r = 25, g = 35, b = 93
                }
                d3.select('#viewport')
                    .append('path')
                    .attr('d', voronoi.renderCell(i))
                    .attr('fill', `rgb(${r},${g},${b})`)
            }
        }
        // var i = 0
        // function loop() {
        //     const delaunay = Delaunay.from(points);
        //     const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
        //     voronoi.renderCell(i, ctx)
        //     requestAnimationFrame(loop)
        // }
        // requestAnimationFrame(loop)
        // window.onresize = () => {
        //     const delaunay = Delaunay.from(points);
        //     const voronoi = delaunay.voronoi([0, 0, ctx.canvas.width, ctx.canvas.height]);
        //     ctx.canvas.width = window.innerWidth;
        //     ctx.canvas.height = window.innerHeight;
        //     ctx.beginPath()
        //     delaunay.renderPoints(ctx);
        //     ctx.fill()
        //     ctx.beginPath()
        //     voronoi.render(ctx)
        //     ctx.stroke()
        // }
    }
    componentWillUnmount() {
        d3.select('svg').remove()
    }
    render() {
        // return <canvas ref="canvas" width={400} height={300} />
        return <></>
    }
}