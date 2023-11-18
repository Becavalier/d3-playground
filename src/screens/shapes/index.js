import { useEffect } from "react"
import { 
  select, 
  selectAll, 
  selection, 
  line,
  scaleLinear,
  lineRadial,
  curveCardinal,
  area,
  areaRadial,
  stack,
  stackOffsetNone,
  stackOffsetExpand,
  stackOffsetSilhouette,
  stackOffsetWiggle,
  stackOrderNone,
  stackOrderAscending,
  stackOrderDescending,
  stackOrderInsideOut,
  stackOrderReverse,
  arc,
  pie,
  symbol,
  symbolCircle,
  symbolDiamond,
  symbolDiamond2,
  symbolWye
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Section 1
     */
    {
      const lineGenerator = line()
        // The line generator will skip over the data point if it returns false.
        .defined(d => d !== null)
      const points = [
        [0, 0],  // [x, y].
        [100, 140],
        [200, 30],
        [300, 50],
        null,
        [400, 40],
        [500, 80],
      ]
      const pathData = lineGenerator(points)
      select('.section-1 > svg > g > path')
        .style('fill', 'none')
        .style('stroke', '#999')
        // d -> path data, containing commands like "M0,80L100,100L200,30L300,50L400,40L...".
        .attr('d', pathData)  
    }

    /**
     * Section 2
     */
    {
      const xScale = scaleLinear().domain([0, 6]).range([0, 600])
      const yScale = scaleLinear().domain([0, 80]).range([150, 0])
      const lineGenerator = line()
        .x((d, i) => xScale(i))  // With "accessor functions".
        .y((d) => yScale(d.value))
      const data = [
        { value: 10, },
        { value: 50, },
        { value: 30, },
        { value: 40, },
        { value: 20, },
        { value: 70, },
        { value: 50, },
      ]
      const pathData = lineGenerator(data)
      select('.section-2 > svg > g > path')
        .style('fill', 'none')
        .style('stroke', '#999')
        .attr('d', pathData)
    }

    /**
     * Section 3
     */
    {
      const lineGenerator = line()
        .curve(curveCardinal)  // Interpolate each data point with a B-spline.
        // Curve explorer: https://www.d3indepth.com/examples-merged/shapes/curve-explorer/
      const points = [
        [0, 0],  // [x, y].
        [100, 140],
        [200, 30],
        [300, 50],
        [400, 40],
        [500, 80],
      ]
      const pathData = lineGenerator(points)
      select('.section-3 > svg > g > path')
        .style('fill', 'none')
        .style('stroke', '#999')
        .attr('d', pathData)
    }

    /**
     * Section 4
     */
    {
      const context = select('.section-4 > canvas').node().getContext('2d')  // Draw on the canvas.
      const lineGenerator = line()
      lineGenerator.context(context)
      const points = [
        [0, 0],  // [x, y].
        [100, 140],
        [200, 30],
        [300, 50],
        [400, 40],
        [500, 80],
      ]
      context.beginPath()
      lineGenerator(points)
      context.strokeStyle = '#999'
      context.stroke()
    }

    /**
     * Section 5
     */
    {
      // Similar to the line generator but the points are transformed by angle.
      const lineGenerator = lineRadial()
      // lineGenerator.angle(d => d.angle).radius(d => d.radius)
      const points = [
        [0, 80],
        [Math.PI * 0.25, 80],
        [Math.PI * 0.5, 30],
        [Math.PI * 0.75, 80],
        [Math.PI, 80],
        [Math.PI * 1.25, 80],
        [Math.PI * 1.5, 80],
        [Math.PI * 1.75, 80],
        [Math.PI * 2, 80]
      ]
      const pathData = lineGenerator(points)
      select('.section-5 > svg > g > path')
        .style('fill', 'none')
        .style('stroke', '#999')
        .attr('d', pathData)
    }

    /**
     * Section 6
     */
    {
      const areaGenerator = area()
      areaGenerator.y0(10)  // Set up the baseline of the area.
      const points = [
        [0, 80],
        [100, 100],
        [200, 30],
        [300, 50],
        [400, 40],
        [500, 80]
      ]
      const pathData = areaGenerator(points)
      select('.section-6 > svg > g > path')
        .style('fill', 'lightgrey')
        .style('stroke', '#999')
        .attr('d', pathData)
    }

    /**
     * Section 7
     */
    {
      const yScale = scaleLinear().domain([0, 100]).range([200, 0])
      const areaGenerator = area()
      areaGenerator
        .x(d => d.x)
        .y0(d => yScale(d.low))  // Baseline.
        .y1(d => yScale(d.high))  // Top line
      const points = [
        { x: 0, low: 30, high: 80 },
        { x: 100, low: 80, high: 100 },
        { x: 200, low: 20, high: 30 },
        { x: 300, low: 20, high: 50 },
        { x: 400, low: 10, high: 40 },
        { x: 500, low: 50, high: 80 }
      ]
      const pathData = areaGenerator(points)
      select('.section-7 > svg > g > path')
        .style('fill', 'lightgrey')
        .style('stroke', '#999')
        .attr('d', pathData)
    }

    /**
     * Section 8
     */
    {
      const area = areaRadial()
        .angle(d => d.angle)
        .innerRadius(d => d.r0)
        .outerRadius(d => d.r1)
      const points = [
        { angle: 0, r0: 20, r1: 80 },
        { angle: Math.PI * 0.25, r0: 20, r1: 40 },
        { angle: Math.PI * 0.5, r0: 20, r1: 80 },
        { angle: Math.PI * 0.75, r0: 20, r1: 40 },
        { angle: Math.PI, r0: 20, r1: 80 },
        { angle: Math.PI * 1.25, r0: 20, r1: 40 },
        { angle: Math.PI * 1.5, r0: 20, r1: 80 },
        { angle: Math.PI * 1.75, r0: 20, r1: 40 },
        { angle: Math.PI * 2, r0: 20, r1: 80 }
      ]
      const pathData = area(points)
      select('.section-8 > svg > g > path')
        .style('fill', 'lightgrey')
        .attr('d', pathData)
    }

    /**
     * Section 9
     */
    {
      const stackInputData = stack().keys(['apricots', 'blueberries', 'cherries'])
      const data = [
        { day: 'Mon', apricots: 120, blueberries: 180, cherries: 100 },
        { day: 'Tue', apricots: 60,  blueberries: 185, cherries: 105 },
        { day: 'Wed', apricots: 100, blueberries: 215, cherries: 110 },
        { day: 'Thu', apricots: 80,  blueberries: 230, cherries: 105 },
        { day: 'Fri', apricots: 120, blueberries: 240, cherries: 105 }
      ]
      const colors = ['#FBB65B', '#513551', '#de3163']
      const stackedSeries = stackInputData(data)
      const g = select('.section-9 > svg > g')
        .selectAll('g.series')
        .data(stackedSeries)
        .join('g')
        .classed('series', true)
        .style('fill', (d, i) => colors[i])
      g.selectAll('rect')
        .data(d => {
          console.log(d)  // d -> data, here we reuse the same data.
          return d
        })
        .join('rect')
        .attr('width', d => d[1] - d[0])
        .attr('x', d => d[0])
        .attr('y', (d, i) => i * 20)
        .attr('height', 19)
    }

    /**
     * Section 10
     */
    {
      const data = [
        { day: 'Mon', apricots: 120, blueberries: 180, cherries: 100 },
        { day: 'Tue', apricots: 60,  blueberries: 185, cherries: 105 },
        { day: 'Wed', apricots: 100, blueberries: 215, cherries: 110 },
        { day: 'Thu', apricots: 80,  blueberries: 230, cherries: 105 },
        { day: 'Fri', apricots: 120, blueberries: 240, cherries: 105 }
      ]
      const colors = ['#FBB65B', '#513551', '#de3163']
      const update = (offsetFn = stackOffsetNone) => {
        const yScale = offsetFn === stackOffsetExpand ?
          scaleLinear().domain([0, 1]).range([150, 0]) : 
          scaleLinear().domain([0, 600]).range([200, 0])
        const areaGenerator = area()
          .x((d, i) => i * 100)
          .y0(d => yScale(d[0]))
          .y1(d => yScale(d[1]))
        const stackInputData = stack()
          .keys(['apricots', 'blueberries', 'cherries'])
          .offset(offsetFn)
        const stackedSeries = stackInputData(data)
        console.log(stackedSeries)
        select('.section-10 > svg > g')
          .selectAll('path')
          .data(stackedSeries)
          .join('path')
          .style('fill', (d, i) => colors[i])
          .attr('d', areaGenerator)
      }
      update()
      selectAll('input[name="stack-type"]').on('click', (evt) => {
        update([
          stackOffsetNone, 
          stackOffsetExpand, 
          stackOffsetSilhouette, 
          stackOffsetWiggle,
        ][+evt.target.value])
      })
    }

    /**
     * Section 11
     */
    {
      const data = [
        { day: 'Mon', apricots: 120, blueberries: 180, cherries: 100 },
        { day: 'Tue', apricots: 60,  blueberries: 185, cherries: 105 },
        { day: 'Wed', apricots: 100, blueberries: 215, cherries: 110 },
        { day: 'Thu', apricots: 80,  blueberries: 230, cherries: 105 },
        { day: 'Fri', apricots: 120, blueberries: 240, cherries: 105 }
      ]
      const colors = ['#FBB65B', '#513551', '#de3163']
      const update = (orderFn = stackOrderNone) => {
        const yScale = scaleLinear().domain([0, 600]).range([200, 0])
        const areaGenerator = area()
          .x((d, i) => i * 100)
          .y0(d => yScale(d[0]))
          .y1(d => yScale(d[1]))
        const stackInputData = stack()
          .keys(['apricots', 'blueberries', 'cherries'])
          .order(orderFn)
        const stackedSeries = stackInputData(data)
        console.log(stackedSeries)
        select('.section-11 > svg > g')
          .selectAll('path')
          .data(stackedSeries)
          .join('path')
          .style('fill', (d, i) => colors[i])
          .attr('d', areaGenerator)
      }
      update()
      selectAll('input[name="order-type"]').on('click', (evt) => {
        update([
          stackOrderNone,
          stackOrderAscending,
          stackOrderDescending,
          stackOrderInsideOut,
          stackOrderReverse,
        ][+evt.target.value])
      })
    }

     /**
     * Section 12
     */
     {
      const arcGenerator = arc()
      arcGenerator
        .innerRadius(50)  // Pre-configured.
        .outerRadius(100)
        .padAngle(.02)
      const pathData = arcGenerator({
        startAngle: 0,
        endAngle: 0.25 * Math.PI,
        // Measured clockwise from the 12 o'clock in radians.
        // innerRadius: 50,  
        // outerRadius: 100
      })
      select('.section-12 > svg > g > path')
        .style('fill', 'lightgrey')
        .attr('d', pathData)
    }

    /**
     * Section 13
     */
    {
      const arcGenerator = arc()
      arcGenerator
        .innerRadius(20)
        .outerRadius(100)
        .cornerRadius(10)
        // Define padding between arc segments.
        .padAngle(.02)
        .padRadius(200)
        // Accessor functions.
        .startAngle(d => d.startAngle)  
        .endAngle(d => d.endAngle)
        
      const arcData = [
        { startAngle: 0, endAngle: 0.2 },
        { startAngle: 0.2, endAngle: 0.6 },
        { startAngle: 0.6, endAngle: 1.4 },
        { startAngle: 1.4, endAngle: 3 },
        { startAngle: 3, endAngle: 2 * Math.PI }
      ]
      select('.section-13 > svg > g')
        .selectAll('path')
        .data(arcData)
        .join('path')
        .style('fill', 'lightgrey')
        .attr('d', d => {
          return arcGenerator(d)
        })
    }

    /**
     * Section 14
     */
    {
      const arcGenerator = arc()
      arcGenerator
        .innerRadius(20)
        .outerRadius(100)
        .cornerRadius(0)
        .padAngle(.02)
        .padRadius(100)
        .startAngle(d => d.startAngle)  // Accessor functions.
        .endAngle(d => d.endAngle)
        
      const arcData = [
        { label: 'A', startAngle: 0, endAngle: 0.2 },
        { label: 'B', startAngle: 0.2, endAngle: 0.6 },
        { label: 'C', startAngle: 0.6, endAngle: 1.4 },
        { label: 'D', startAngle: 1.4, endAngle: 3 },
        { label: 'E', startAngle: 3, endAngle: 2 * Math.PI }
      ]
      select('.section-14 > svg > g')
        .selectAll('path')
        .data(arcData)
        .join('path')
        .style('fill', 'lightgrey')
        .attr('d', arcGenerator)
      select('.section-14 > svg > g')
        .selectAll('text')
        .data(arcData)
        .join('text')
        .style('font-size', '12px')
        .style('text-anchor', 'middle')
        .each(function(d) {
          const [x, y] = arcGenerator.centroid(d)
          select(this)
            .attr('x', x)
            .attr('y', y)
            .attr('dy', '0.33em')
            .text(d.label)
        })
    }

    /**
     * Section 15
     */
    {
      const data = [
        { name: 'Apples', quantity: 20 },
        { name: 'Bananas', quantity: 40 },
        { name: 'Cherries', quantity: 50 },
        { name: 'Damsons', quantity: 10 },
        { name: 'Elderberries', quantity: 30 },
      ]
      const pieGenerator = pie()
        .value(d => d.quantity)
        .padAngle(.02)
        .sort((a, b) => a.name.localeCompare(b.name))  // Change the order of segments.
        // Configure the start and end angle of the pie chart.
        // .startAngle(-0.5 * Math.PI)
        // .endAngle(0.5 * Math.PI)
      const arcData = pieGenerator(data)
      const arcGenerator = arc()
        .innerRadius(20)
        .outerRadius(100)

      select('.section-15 > svg > g')
        .selectAll('path')
        .data(arcData)
        .join('path')
        .style('fill', 'lightgrey')
        .attr('d', arcGenerator)
      select('.section-15 > svg > g')
        .selectAll('text')
        .data(arcData)
        .join('text')
        .style('font-size', '12px')
        .style('text-anchor', 'middle')
        .each(function(d) {
          const [x, y] = arcGenerator.centroid(d)
          select(this)
            .attr('x', x)
            .attr('y', y)
            .attr('dy', '0.33em')
            .text(d.data.name)
        })
    }

    /**
     * Section 16
     */
    {
      const generate = (type) => {
        const symbolGenerator = symbol()
          .type(type)
          .size(1000)
        return symbolGenerator()
      }
      const data = [
        symbolCircle,
        symbolDiamond,
        symbolDiamond2,
        symbolWye
      ].map((fn, i) => {
        return {
          gen: generate(fn, 50 * i),
          dist: i * 80,
        }
      })
      select('.section-16 > svg > g')
        .selectAll('path')
        .data(data)
        .join('path')
        .style('fill', 'lightgrey')
        .attr('transform', d => 'translate(' + d.dist + ')')
        .attr('d', d => d.gen)
    }
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-2">
        <p>Section 2</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-3">
        <p>Section 3</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-4">
        <p>Section 4</p>
        <canvas width="760px" height="140px"></canvas>
      </div>
      <div className="section-5">
        <p>Section 5</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 200" 
          width="760" 
          height="200" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100,100)">
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-6">
        <p>Section 6</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-7">
        <p>Section 7</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-8">
        <p>Section 8</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 200" 
          width="760" 
          height="200" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 100)">
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-9">
        <p>Section 9</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-10">
        <p>Section 10</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 300" 
          width="760" 
          height="300" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
        <fieldset>
          <legend>Select a stack offset:</legend>
          <div>
            <input type="radio" id="stackOffsetNone" name="stack-type" value="0" />
            <label htmlFor="stackOffsetNone"><b>stackOffsetNone</b>: (default) no offset.</label>
          </div>
          <div>
            <input type="radio" id="stackOffsetExpand" name="stack-type" value="1" />
            <label htmlFor="stackOffsetExpand"><b>stackOffsetExpand</b>: sum of series is normalised (to a value of 1).</label>
          </div>
          <div>
            <input type="radio" id="stackOffsetSilhouette" name="stack-type" value="2" />
            <label htmlFor="stackOffsetSilhouette"><b>stackOffsetSilhouette</b>: center of stacks is at y=0.</label>
          </div>
          <div>
            <input type="radio" id="stackOffsetWiggle" name="stack-type" value="3" />
            <label htmlFor="stackOffsetWiggle"><b>stackOffsetWiggle</b>: wiggle of layers is minimised (typically used for streamgraphs).</label>
          </div>
        </fieldset>
      </div>
      <div className="section-11">
        <p>Section 11</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 240" 
          width="760" 
          height="240" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
        <fieldset>
          <legend>Select a stack order:</legend>
          <div>
            <input type="radio" id="stackOrderNone" name="order-type" value="0" />
            <label htmlFor="stackOrderNone"><b>stackOrderNone</b>: (default) series in same order as specified in .keys().</label>
          </div>
          <div>
            <input type="radio" id="stackOrderAscending" name="order-type" value="1" />
            <label htmlFor="stackOrderAscending"><b>stackOrderAscending</b>: smallest series at the bottom.</label>
          </div>
          <div>
            <input type="radio" id="stackOrderDescending" name="order-type" value="2" />
            <label htmlFor="stackOrderDescending"><b>stackOrderDescending</b>: largest series at the bottom.</label>
          </div>
          <div>
            <input type="radio" id="stackOrderInsideOut" name="order-type" value="3" />
            <label htmlFor="stackOrderInsideOut"><b>stackOrderInsideOut</b>: largest series in the middle.</label>
          </div>
          <div>
            <input type="radio" id="stackOrderReverse" name="order-type" value="4" />
            <label htmlFor="stackOrderReverse"><b>stackOrderReverse</b>: reverse of stackOrderNone.</label>
          </div>
        </fieldset>
      </div>
      <div className="section-12">
        <p>Section 12</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 140)">
            <path></path>
          </g>  
        </svg>
      </div>
      <div className="section-13">
        <p>Section 13</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 240" 
          width="760" 
          height="240" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 140)">
          </g>  
        </svg>
      </div>
      <div className="section-14">
        <p>Section 14</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 240" 
          width="760" 
          height="240" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 140)">
          </g>  
        </svg>
      </div>
      <div className="section-15">
        <p>Section 15</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 240" 
          width="760" 
          height="240" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 140)">
          </g>  
        </svg>
      </div>
      <div className="section-16">
        <p>Section 16</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 240" 
          width="760" 
          height="240" 
          xmlns="http://www.w3.org/2000/svg">
          <g x="100" transform="translate(100, 140)">
            <path></path>
          </g>  
        </svg>
      </div>
    </div>
  )
}

