import { useEffect } from "react"
import { 
  select, 
  selectAll, 
  selection, 
  scaleLinear, 
  scaleSqrt, 
  scalePow, 
  scaleLog, 
  scaleTime,
  scaleSequential,
  scaleQuantize,
  scaleQuantile,
  scaleThreshold,
  scaleOrdinal,
  scaleBand,
  scalePoint,
  interpolateRainbow,
  axisBottom,
  extent,
  pointer,
  range,
} from "d3";
import "./styles.css"

export default () => {
  useEffect(() => {
    
    /**
     * Section 1
     */
    const color = scaleLinear().domain([0, 10]).range(['yellow', 'red'])
    let scale = scaleLinear().domain([0, 10]).range([10, 40])
    scale.clamp(true)  // Make the input value stays within the domain.
    select('.section-1 > svg > g')
      .selectAll('circle')
      .data([-10, ...Array.from(Array(10).keys())].map(i => scale(i)))  // The radius of the first circle will be clamped at the edge of the range.
      .join('circle')
      .style('fill', (d, i) => color(i))
      .attr('cx', (d, i) => i * 80)
      .attr('r', (d) => d)
    
    /**
     * Section 2
     */
    scale = scaleSqrt().domain([0, 10]).range([10, 40])  // Exponent -> 0.5
    select('.section-2 > svg > g')
      .selectAll('circle')
      .data(Array.from(Array(10).keys()).map(i => scale(i)))
      .join('circle')
      .style('fill', (d, i) => color(i))
      .attr('cx', (d, i) => i * 80)
      .attr('r', (d) => d)
    
    /**
     * Section 3
     */
    scale = scalePow().exponent(2).domain([0, 10]).range([10, 40])  // Exponent -> manual specified.
    select('.section-3 > svg > g')
      .selectAll('circle')
      .data(Array.from(Array(10).keys()).map(i => scale(i)))
      .join('circle')
      .style('fill', (d, i) => color(i))
      .attr('cx', (d, i) => i * 80)
      .attr('r', (d) => d)

    /**
     * Section 4
     */
    scale = scaleLog().domain([10, 100000]).range([0, 50])  // y = m * log(x) + b.
    select('.section-4 > svg > g')
      .selectAll('circle')
      .data([10, 100, 1000, 10000, 100000].map(i => scale(i)))
      .join('circle')
      .style('fill', 'orange')
      .attr('cx', (d, i) => d * 10)
      .attr('r', 20)
    
    /**
     * Section 5
     */
    const dateArr = [
      new Date(2016, 0, 1), 
      new Date(2016, 3, 1), 
      new Date(2016, 6, 1), 
      new Date(2017, 0, 1),
    ]
    scale = scaleTime().domain([new Date(2016, 0, 1), new Date(2017, 0, 1)]).range([0, 65])
    select('.section-5 > svg > g')
      .selectAll('circle')
      .data(dateArr)
      .join('circle')
      .style('fill', 'orange')
      .attr('cx', (d, i) => scale(d) * 10)
      .attr('r', 20)
    select('.section-5 > svg > g')
      .selectAll('text')
      .data(dateArr)
      .join('text')
      .attr('x', (d, i) => scale(d) * 10)
      .attr('y', 40)
      .text((d) => d.toDateString())
    
    /**
     * Section 6
     */
    // Mapping continuous values to an output range determined by a preset (or custom) interpolator.
    scale = scaleSequential().domain([0, 10]).interpolator(interpolateRainbow)  // Using preset from D3.
    select('.section-6 > svg > g')
      .selectAll('circle')
      .data(Array.from(Array(10).keys()).map(i => scale(i)))
      .join('circle')
      .style('fill', d => d)
      .attr('cx', (d, i) => i * 100)
      .attr('r', 20)
    
    /**
     * Section 7
     */
    const extentData = extent([0.243, 0.584, 0.987, 0.153, 0.433])  // Get the domain range of the given data.
    const linearScale = scaleLinear()
      .domain(extentData)
      .range([0, 600])
      .nice()  // Extends the domain so that it starts and ends on nice round values.
    select('.section-7 > svg > g')
      .call(axisBottom(linearScale))

    /**
     * Section 8
     */
    const segmentColor = scaleLinear()
      .domain([-5, 0, 5])  // Multiple segments.
      .range(['blue', 'black', 'red'])
    select('.section-8 > svg > g')
      .selectAll('circle')
      .data([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
      .join('circle')
      .style('fill', (d, i) => segmentColor(d))
      .attr('cx', (d, i) => i * 80)
      .attr('r', (d, i) => i * 5 + 20)
    
    /**
     * Section 9
     */
    const axisScale = scaleLinear()
      .domain([-50, 50])
      .range([0, 600])
      .nice()  // Extends the domain so that it starts and ends on nice round values.
    select('.section-9 > svg > g')
      .call(axisBottom(axisScale))
      .select('.click-area')
      .on('click', function (evt, d) {
        const [xPos, _] = pointer(evt)
        select('.section-9 span').node().innerHTML = axisScale.invert(xPos).toFixed(2)
      })
    
    /**
     * Section 10
     */
    const colorScale = scaleQuantize()  // Accepts continuous input and outputs a number of discrete quantities defined by the range. 
      .domain([0, 50])
      .range(['lightblue', 'orange', 'lightgreen', 'pink'])
    select('.section-10 > svg > g')
      .selectAll('circle')
      .data(Array(50))
      .join('circle')
      .style('fill', (d, i) => colorScale(i))
      .attr('cx', (d, i) => i * 15)
      .attr('r', 7)
    
    /**
     * Section 11
     * 
     * The motivation of the quantile scale is to obtain classes -
     * which are representative of the actual distribution of the values in the dataset. 
     */
    const quantileScale = scaleQuantile() 
      // The (sorted) domain array is divided into n equal sized groups where n is the number of range values.
      .domain([0, 5, 7, 10, 20, 30, 35, 40, 50])
      .range(['lightblue', 'orange', 'lightgreen'])
    console.log(quantileScale.quantiles())  // [9, 31.666666666666664] <- split points.
    select('.section-11 > svg > g')
      .selectAll('circle')
      .data(Array(50))
      .join('circle')
      .style('fill', (d, i) => quantileScale(i))
      .attr('cx', (d, i) => i * 15)
      .attr('r', 7)
  
    /**
     * Section 12 
     */
    {
      const linearScale = scaleLinear()
        .domain([-10, 110])
        .range([0, 600])
      const thresholdScale = scaleThreshold() 
        .domain([0, 50, 100]) // 4 splits: ~0, 0~50, 50~100, 100~.
        .range(['#ccc', 'lightblue', 'orange', '#ccc']);
      select('.section-12 > svg > g')
        .selectAll('rect')
        .data(range(-10, 110, 2))
        .join('rect')
        .attr('x', d => linearScale(d))
        .attr('width', 9)
        .attr('height', 30)
        .style('fill', d => thresholdScale(d))
    }

    /**
     * Section 13
     */
    {
      const data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const linearScale = scaleLinear()
        .domain([0, 11])
        .range([0, 600])
      // "scaleOrdinal" maps discrete values (specified by an array) to discrete values (also specified by an array).
      const ordinalScale = scaleOrdinal()
        .domain(data)
        .range(['black', '#ccc', '#ccc'])
      ordinalScale.unknown('red')  // For unscoped input values, use "red" instead.
      select('.section-13 > svg > g')
        .selectAll('text')
        .data([...data, 'extra123'])
        .join('text')
        .attr('x', (d, i) => linearScale(i))
        .text(d => d)
        .style('fill', d => ordinalScale(d))
    }

    /**
     * Section 14
     */
    {
      const data = [
        { day : 'Mon', value: 10 },
        { day : 'Tue', value: 40 },
        { day : 'Wed', value: 30 },
        { day : 'Thu', value: 60 },
        { day : 'Fri', value: 30 }
      ]
      // "scaleBand" helps to determine the geometry of the bars.
      const bandScale = scaleBand()
        .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
        .range([0, 100])
        .paddingInner(0.05)  // The amount of padding between each band.
        .paddingOuter(.1)   // The amount of padding before the first band and after the last band.
      select('.section-14 > svg > g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('y', (d, i) => bandScale(d.day))
        .attr('height', bandScale.bandwidth())
        .attr('width', d => d.value)
    }

    /**
     * Section 15
     */
    {
      const data = [
        { day : 'Mon', value: 10 },
        { day : 'Tue', value: 40 },
        { day : 'Wed', value: 30 },
        { day : 'Thu', value: 60 },
        { day : 'Fri', value: 30 }
      ]
      // "scalePoint" map from a discrete set of values to equally spaced points along the specified range.
      const scale = scalePoint()
        .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
        .range([0, 400])
      scale.padding(1)  // Add outside padding (ratio of the padding to point spacing).
      console.log(scale.step())  // Print the distance between the points -> 100.
      select('.section-15 > svg > g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d, i) => scale(d.day))
        .attr('r', 10)
    }
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-2">
        <p>Section 2</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-3">
        <p>Section 3</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-4">
        <p>Section 4</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-5">
        <p>Section 5</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-6">
        <p>Section 6</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-7">
        <p>Section 7</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-8">
        <p>Section 8</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-9">
        <p>Section 9</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect className="click-area" style={{ fill: 'lightgrey' }} width="600" height="40"></rect>
          </g>  
        </svg>
        <span></span>
      </div>
      <div className="section-10">
        <p>Section 10</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-11">
        <p>Section 11</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="40" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-12">
        <p>Section 12</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-13">
        <p>Section 13</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-14">
        <p>Section 14</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="240" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-15">
        <p>Section 15</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 70" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
    </div>
  )
}

