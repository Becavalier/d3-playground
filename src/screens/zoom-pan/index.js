import { useEffect } from "react"
import { 
  select, 
  zoom,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Section 1
     * 
     * Zoom and Pan behavior:
     *   - Call d3.zoom() to create a zoom behaviour function.
     *   - Add an event handler that gets called when a zoom or pan event occurs.
     *   - Attach the zoom behaviour to an element that receives the zoom and pan gestures.
     */
    {
      const width = 600, height = 400, numPoints = 100, data = []
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height
        })
      }
      const update = () => {
        select('.section-1 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.5')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', 3)
      }
      const handleZoom = e => {
        select('.section-1 > svg > g')
          .attr('transform', e.transform)
      }
      update()
      const d3Zoom = zoom()
        .scaleExtent([1, 2])  // Zoom constraints.
        .translateExtent([[0, 0], [width, height]])  // Pan constraints.
        .on('zoom', handleZoom) 
      select('.section-1 > svg')
        .call(d3Zoom)
    } 

    /**
     * Section 2
     */
    {
      const width = 600, height = 400, numPoints = 100, data = []
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height
        })
      }
      const update = () => {
        select('.section-2 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.5')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', 3)
      }
      const handleZoom = e => {
        select('.section-2 > svg > g')  // <- "g" gets zoomed and panned.
          .attr('transform', e.transform)
      }
      update()
      const d3Zoom = zoom()
        .on('zoom', handleZoom) 

      // The parent SVG receives the zoom and pan gestures, and -
      // the elements "g" under it gets zoomed and panned.
      select('.section-2 > svg')
        .call(d3Zoom)
      
      // Listeners.
      select('.section-2 button.zoom-in').on('click', () => {
        select('.section-2 > svg')
          .transition()
          .call(d3Zoom.scaleBy, 1.25)
      })

      select('.section-2 button.zoom-out').on('click', () => {
        select('.section-2 > svg')
          .transition()
          .call(d3Zoom.scaleBy, .8)
      })

      select('.section-2 button.reset-zoom').on('click', () => {
        select('.section-2 > svg')
          .transition()
          .call(d3Zoom.scaleTo, 1)
      })

      select('.section-2 button.center').on('click', () => {
        select('.section-2 > svg')
          .transition()
          .call(d3Zoom.translateTo, 0.5 * width, 0.5 * height)
      })

      select('.section-2 button.pan-left').on('click', () => {
        select('.section-2 > svg')
          .transition()
          .call(d3Zoom.translateBy, -50, 0)
      })

      select('.section-2 button.pan-right').on('click', () => {
        select('.section-2 > svg')
          .transition()
          .call(d3Zoom.translateBy, 50, 0)
      })
    } 
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1 - Pan and Zoom</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-2">
        <p>Section 2 - Programmatic Pan and Zoom</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 600 400" 
          width="600" 
          height="400" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
        <div>
          <button className="zoom-in">Zoom in</button>
          <button className="zoom-out">Zoom out</button>
          <button className="reset-zoom">Reset zoom</button>
          <button className="pan-left">Pan left</button>
          <button className="pan-right">Pan left</button>
          <button className="center">Center</button>
        </div>
      </div>
    </div>
  )
}

