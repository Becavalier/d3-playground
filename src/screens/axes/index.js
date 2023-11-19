import { useEffect } from "react"
import { 
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  scaleLinear,
  select, 
  scaleSqrt, 
  scaleLog, 
  scaleTime,
  scaleBand,
  scalePoint,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Section 1
     */
    {
      const scale = scaleLinear()
        .domain([0, 100])
        .range([0, 500])
      const axisCreator = axisBottom(scale)
      select('.section-1 > svg > g')
        // Create an axis on a given "g" container.
        // (selections) => creator(...)
        .call(axisCreator)  
    }

    /**
     * Section 2
     */
    {
      const scale = scaleLinear()
        .domain([0, 100])
        .range([0, 400])
      const axisBottomCreator = axisBottom(scale)
      const axisLeftCreator = axisLeft(scale)
      const axisRightCreator = axisRight(scale)
      const axisTopCreator = axisTop(scale)
      select('.section-2 > svg > g.bottom').call(axisBottomCreator)  
      select('.section-2 > svg > g.left').call(axisLeftCreator)  
      select('.section-2 > svg > g.right').call(axisRightCreator)  
      select('.section-2 > svg > g.top').call(axisTopCreator)  
    }

    /**
     * Section 3
     * 
     * The same range has the same length of axis.
     */
    {
      const linearScale = scaleLinear()
        .domain([0, 100])
        .range([0, 500])
      const sqrtScale = scaleSqrt()
        .domain([0, 100])
        .range([0, 500])
      const logScale = scaleLog()
        .domain([10, 1000])
        .range([0, 500])
      const timeScale = scaleTime()
        .domain([new Date(2020, 0, 1), new Date(2020, 5, 1)])
        .range([0, 500])
      const bandScale = scaleBand()
        .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
        .range([0, 500])
      const pointScale = scalePoint()
        .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
        .range([0, 500])

      const axis = axisBottom()
      axis.scale(linearScale)
      select('.section-3 > svg > g.linear').call(axis)  
      axis.scale(sqrtScale)
      select('.section-3 > svg > g.sqrt').call(axis)  
      axis.scale(logScale)
      select('.section-3 > svg > g.log').call(axis)  
      axis.scale(timeScale)
      select('.section-3 > svg > g.time').call(axis)  
      axis.scale(timeScale)
      select('.section-3 > svg > g.time').call(axis)  
      axis.scale(bandScale)
      select('.section-3 > svg > g.band').call(axis)  
      axis.scale(pointScale)
      select('.section-3 > svg > g.point').call(axis)  
    }

    /**
     * Section 4
     */
    {
      const scale = scaleLinear()
        .domain([0, 100])
        .range([0, 500])
      const axisBottomCreator = axisBottom(scale)
      const update = () => {
        select('.section-4 > svg > g')
          .transition()  // Make the axis animate.
          .call(axisBottomCreator)  
      }
      update()
      select('.section-4 > button').on('click', (evt, d) => {
        const min = Math.random() * 100
        const max = min + Math.random() * 100
        scale.domain([min, max]);
        update()
      })
    }

    /**
     * Section 5
     */
    {
      const scale = scaleLinear()
        .domain([0, 100])
        .range([0, 500])
      const axisCreator = axisBottom(scale)
      // Specify how many ticks the axis has, and the format (controlled by d3-format).
      axisCreator.ticks(20, "$.2f")  
      // axisCreator.tickFormat((d) => d + "%")  // Formatting functioin.
      axisCreator.tickValues([0, 100])
      // Specify the length and padding of the ticks.
      axisCreator.tickSize(20)  
      axisCreator.tickPadding(10)
      axisCreator.tickSizeInner(70)  // The size of the "line" composing the tick.
      axisCreator.tickSizeOuter(110) // The size of "path" above the tick (the main axis line)
      select('.section-5 > svg > g')
        // Create an axis on a given "g" container.
        // (selections) => creator(...)
        .call(axisCreator)  
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
          <g transform="translate(20, 50)">
          </g>  
        </svg>
      </div>
      <div className="section-2">
        <p>Section 2</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 500" 
          width="760" 
          height="500" 
          xmlns="http://www.w3.org/2000/svg">
          <g className="left" transform="translate(30, 40)"></g>  
          <g className="right" transform="translate(450, 40)"></g>  
          <g className="top" transform="translate(40, 30)"></g>  
          <g className="bottom" transform="translate(40, 450)"></g>  
        </svg>
      </div>
      <div className="section-3">
        <p>Section 3  </p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 300" 
          width="760" 
          height="300" 
          xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30">scaleLinear</text>
          <g className="linear" transform="translate(100, 20)"></g>
          <text x="0" y="80">scaleSqrt</text>
          <g className="sqrt" transform="translate(100, 70)"></g>
          <text x="0" y="130">scaleLog</text>
          <g className="log" transform="translate(100, 120)"></g>
          <text x="0" y="180">scaleTime</text>
          <g className="time" transform="translate(100, 170)"></g>
          <text x="0" y="230">scaleBand</text>
          <g className="band" transform="translate(100, 220)"></g>
          <text x="0" y="280">scalePoint</text>
          <g className="point" transform="translate(100, 270)"></g>
        </svg>
      </div>
      <div className="section-4">
        <p>Section 4</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
        <button>Change Scale Domain</button>
      </div>
      <div className="section-5">
        <p>Section 5</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
      </div>
    </div>
  )
}

