import { useEffect } from "react"
import { 
  select, 
  forceSimulation,
  forceManyBody,
  forceCenter,
  range,
  forceCollide,
  forceX,
  forceY,
  forceLink,
} from "d3"
import "./styles.css"

export default () => {
  const allSimulations = []
  useEffect(() => {
    /**
     * D3's force layout uses physics based rules to position visual elements.
     * Forces can be set up between elements, for example:
     *   - All elements can be configured to repel one another.
     *   - Elements can be attracted to center(s) of gravity.
     *   - Linked elements can be set a fixed distance apart (e.g. for network visualisation).
     *   - Elements can be configured to avoid intersecting one another (collision detection).
     */

    /**
     * Section 1
     */
    {
      const nodes = [{}, {}, {}, {}, {}]
      const ticked = () => {  // The update callback function.
        select('.section-1 > svg > g')
          .selectAll('circle')  // Add circle.
          .data(nodes)
          .join('circle')
          .style('fill', 'orange')
          .attr('r', 5)
          .attr('cx', d => d.x)  // Update position.
          .attr('cy', d => d.y)
      }
      const width = 300, height = 300
      const sim = forceSimulation(nodes)
        .force('charge', 
          forceManyBody()  // Makes the elements repel each other.
          .strength(-30))  // (< 0) -> repelish, (> 0) -> attraction.
        // Attracts the elements towards a centre point.
        .force('center', forceCenter(width / 2, height / 2))
        .on('tick', ticked)
      allSimulations.push(sim)
    }

    /**
     * Section 2
     */
    {
      const width = 300, height = 300
      const numNodes = 100
      const nodes = range(numNodes).map(d => {
        return {
          radius: Math.random() * 25
        }
      })
      const ticked = () => {  // The update callback function.
        select('.section-2 > svg > g')
          .selectAll('circle')  // Add circle.
          .data(nodes)
          .join('circle')
          .style('fill', 'orange')
          .attr('r', d => d.radius)
          .attr('cx', d => d.x)  // Update position.
          .attr('cy', d => d.y)
      }
      const sim = forceSimulation(nodes)
        .force('charge', forceManyBody().strength(5))  // Clumping.
        .force('center', forceCenter(width / 2, height / 2))
        // Stops circular elements overlapping.
        .force('collision', forceCollide().radius(d => d.radius))
        .on('tick', ticked)
      allSimulations.push(sim)
    }

    /**
     * Section 3
     */
    {
      const height = 300
      const numNodes = 100
      const xCenter = [100, 300, 500];
      const colorScale = ['orange', 'lightblue', '#B19CD9']
      const nodes = range(numNodes).map((d, i) => {
        return {
          radius: Math.random() * 25,
          category: i % 3
        }
      })
      const ticked = () => {  // The update callback function.
        select('.section-3 > svg > g')
          .selectAll('circle')  // Add circle.
          .data(nodes)
          .join('circle')
          .style('fill', d => colorScale[d.category])
          .attr('r', d => d.radius)
          .attr('cx', d => d.x)  // Update position.
          .attr('cy', d => d.y)
      }
      const sim = forceSimulation(nodes)
        .force('charge', forceManyBody().strength(5))
        // Causes elements to be attracted towards specified position(s).
        .force('x', forceX().x(d => xCenter[d.category]))
        .force('y', forceY(height / 2))
        .force('collision', forceCollide().radius(d => d.radius))
        .on('tick', ticked)
      allSimulations.push(sim)
    }

    /**
     * Section 4
     */
    {
      const width = 400, height = 300
      const nodes = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' },
        { name: 'F' },
        { name: 'G' },
        { name: 'H' },
      ]
      const links = [
        { source: 0, target: 1 },  // The node index.
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 1, target: 6 },
        { source: 3, target: 4 },
        { source: 3, target: 7 },
        { source: 4, target: 5 },
        { source: 4, target: 7 }
      ]
      const ticked = () => { 
        select('.section-4 > svg > g.links')
          .selectAll('line')
          .data(links)
          .join('line')
          .style('stroke', '#ccc')
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y) 
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y) 
        select('.section-4 > svg > g.nodes')
          .selectAll('text') 
          .data(nodes)
          .join('text')
          .text(d => d.name)
          .attr('dy', 5)
          .attr('x', d => d.x)
          .attr('y', d => d.y)
      }
      const sim = forceSimulation(nodes)
        .force('charge', forceManyBody().strength(-35))
        .force('center', forceCenter(width / 2, height / 2))
        .force('link', forceLink().links(links).distance(100))  // Pushes linked elements to be a fixed distance apart.
        .on('tick', ticked)
      allSimulations.push(sim)
    }
    return () => {
      allSimulations.forEach(sim => sim.stop())
    }
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1 - Force Layout</p>
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
        <p>Section 2 - Force Layout, forceCollide</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 15)">
          </g>  
        </svg>
      </div>
      <div className="section-3">
        <p>Section 3 - Force Layout, forceX/Y</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(50, 15)">
          </g>  
        </svg>
      </div>
      <div className="section-4">
        <p>Section 4 - Force Layout, forceLink</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 15)" className="links"></g>  
          <g transform="translate(10, 15)" className="nodes"></g>  
        </svg>
      </div>
    </div>
  )
}

