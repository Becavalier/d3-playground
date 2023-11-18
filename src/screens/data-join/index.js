import { useEffect } from "react"
import { select, selectAll, selection, } from "d3";
import "./styles.css"

export default () => {
  useEffect(() => {
    
    /**
     * Section 1
     */

    // Root (document.documentElement) selection.
    let root = selection().select('.section-1')
    const data = [40, 30, 20, 60, 30]
    root.select('svg > g')
      .selectAll('circle')
      .data(data)
      .join('circle')  // Returns a selection containing all of the joined elements.
      .attr('cx', (d, i) => i * 150)
      .attr('cy', 0)
      .attr('r', (d, i) => d)
      .style('fill', 'orange')

    /**
     * Section 2
     */
    root = select('.section-2')
    const update = (data) => {
      root.select('svg > g')
        .selectAll('circle')
        // The second key function returns a unique id value for each array element, -
        // if the array elements can change position within the array, we should probably use a key function.
        .data(data, d => d.name)  
        // .join('circle)
        .join(
          enter => {
            return enter.append('circle')
              .attr('stroke', 'black')
              .attr('stroke-width', '10')
          },
          update => {
            return update.attr('stroke', 'none')
          },
          exit => exit.remove()
        )
        .transition()
        .attr('cx', (d, i) => i * 100)
        .attr('cy', 0)
        .attr('r', d => 0.000004 *  d.population)
        .style('fill', '#aaa')
    }
    const dataArr = [
      { name: 'London', population: 8674000 },
      { name: 'New York', population: 8406000 },
      { name: 'Sydney', population: 4293000 },
      { name: 'Paris', population: 2244000 },
      { name: 'Beijing', population: 11510000 }
    ]
    update(dataArr)
    root.select('button').on('click', (evt, d) => {
      dataArr.unshift({ name: `Country-${Math.random()}`, population: 12674000 })
      update(dataArr)
    })
    root.select('button:last-child').on('click', (evt, d) => {
      root.selectAll('svg > g > circle').each(function() {
        console.log(this.__data__)  // Print the joining data.
      })
    })
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
        <button>Update</button>
        <button>Inspect</button>
      </div>
    </div>
  )
}

