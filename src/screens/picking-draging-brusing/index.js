import { useEffect } from "react"
import { 
  select, 
  quadtree,
  pointer,
  Delaunay,
  drag,
  brush,
  brushX,
  brushY,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Section 1
     * 
     * A quadtree is a tree data structure that recursively divides an area into smaller -
     * and smaller areas and can make searching for items more efficient.
     */
    {
      let hoveredId
      const width = 600, height = 400, numPoints = 100, data = []
      const d3Quadtree = quadtree()
        .x(d => d.x)
        .y(d => d.y)
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1 + Math.random() * 20
        })
      }
      d3Quadtree.addAll(data)
      const handleMousemove = function(e) {
        const pos = pointer(e, this)
        // Find the nearest point in the quadtree, -
        // only points within the given distance (20) are returned.
        const d = d3Quadtree.find(pos[0], pos[1], 20)
        hoveredId = d ? d.id : undefined
        update()
      }
      const update = () => {
        select('.section-1 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.r)
          .attr('fill', d => d.id === hoveredId ? 'red' : null)
      }
      update()
      select('.section-1 > svg').on('mousemove', handleMousemove)
    }

    /**
     * Section 2
     * 
     * Given an array of points, a Delaunay triangulation connects all the points with triangles in such a way that slivers are minimised.
     */
    {
      let hoveredId
      const width = 600, height = 400, numPoints = 100, data = []
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1 + Math.random() * 20
        })
      }
      const d3Delaunay = Delaunay.from(data, d => d.x, d => d.y)
      const handleMousemove = function(e) {
        const pos = pointer(e, this)
        // Find the nearest point, no distance parameter supported.
        const i = d3Delaunay.find(pos[0], pos[1])
        hoveredId = data[i].id
        update()
      }
      const update = () => {
        select('.section-2 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.r)
          .attr('fill', d => d.id === hoveredId ? 'red' : null)
      }
      update()
      select('.section-2 > svg').on('mousemove', handleMousemove)
    }

    /**
     * Section 3
     * 
     * Dragging:
     *  - Call d3.drag() to create a drag behaviour function.
     *  - Add an event handler that's called when a drag event occurs. 
     *  - Attach the drag behaviour to the elements you want to make draggable.
     */
    {
      const width = 600, height = 400, numPoints = 10, data = []
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height
        })
      }
      const update = () => {
        select('.section-3 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.5')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', 40)
      }
      const handleDrag = e => {
        e.subject.x = e.x
        e.subject.y = e.y
        update()
      }
      update()
      // The drag handler should be installed after the first render.
      const d3Drag = drag().on('drag', handleDrag)
      select('.section-3 > svg > g')
        .selectAll('circle')
        .call(d3Drag)
    }
    
    /**
     * Section 4
     * 
     * Brushing:
     *  - Call d3.brush() to create a brush behaviour function.
     *  - Add an event handler that's called when a brush event occurs. 
     *  - Attach the brush behaviour to the elements.
     */
    {
      let brushExtent
      const width = 600, height = 400, numPoints = 100, data = []
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height
        })
      }
      const isInBrushExtent = (d) => {
        return brushExtent &&
          d.x >= brushExtent[0][0] &&
          d.x <= brushExtent[1][0] &&
          d.y >= brushExtent[0][1] &&
          d.y <= brushExtent[1][1]
      }
      const update = () => {
        select('.section-4 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.5')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', 4)
          .style('fill', d => isInBrushExtent(d) ? 'red' : 'black')
      }
      const handleBrush = e => {
        brushExtent = e.selection
        update()
      }
      update()
      // "brushX()" and "brushY()" can be used to support unidirectional brushing.
      // Get called whenever brushing starts or the brush extent changes.
      const d3Brush = brush().on('start brush', handleBrush) 
      select('.section-4 > svg > g')
        .call(d3Brush)
    } 

    /**
     * Section 5
     */
    {
      let brushExtent
      const width = 600, height = 400, numPoints = 100, data = []
      for(let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height
        })
      }
      const isInBrushExtent = (d) => {
        return brushExtent &&
          d.x >= brushExtent[0][0] &&
          d.x <= brushExtent[1][0] &&
          d.y >= brushExtent[0][1] &&
          d.y <= brushExtent[1][1]
      }
      const update = () => {
        select('.section-5 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.5')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', 4)
          .style('fill', d => isInBrushExtent(d) ? 'red' : 'black')
      }
      const handleBrush = e => {
        brushExtent = e.selection
        update()
      }
      update()
      const d3Brush = brush().on('start brush', handleBrush) 
      select('.section-5 > svg > g')
        .call(d3Brush)

      const selectAll = () => {
        select('.section-5 > svg > g')
          .call(d3Brush.move, [[0, 0], [width, height]])  // Select programmatically.
      }
      const clearAll = () => {
        select('.section-5 > svg > g')
          .call(d3Brush.clear)  // Clear all the selected area.
      }
      select('.section-5 > .select-all').on('click', selectAll)
      select('.section-5 > .clear').on('click', clearAll)
    } 
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1 - Quadtrees</p>
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
        <p>Section 2 - Delaunay Triangles</p>
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
      <div className="section-3">
        <p>Section 3 - Dragging</p>
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
      <div className="section-4">
        <p>Section 4 - Brushing</p>
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
      <div className="section-5">
        <p>Section 5 - Programmatic Brushing</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
        <button className="select-all">Select All</button>
        <button className="clear">Clear</button>
      </div>
    </div>
  )
}

