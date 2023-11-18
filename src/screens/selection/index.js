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

    // By convention, selection methods that return the current selection such as selection.attr -
    // use four spaces of indent, while methods that return a new selection use only two.
    root.select('input[type="checkbox"]')
        .property('checked', true)
    root.select('span')
        .text('Demo Playground')

    /**
     * Section 2
     */

    root = select('.section-2')
    const selected = root.selectAll('circle')
        .classed('disc', true)
        .style('fill', 'orange')
        .attr('r', (d, i) => {  // Params: d -> joined data (datum), i -> index.
          return i + Math.random() * 30;
        })
        // Params: evt -> event, d -> joined data.
        .on('click', function (evt, d) {  
          select(this).style('fill', 'black')  // "this" (DOM) is bound to the callback function as a closure.
        })
    console.log(selected instanceof selection)  // true.

    select('svg')
      .selectChildren('g')  // Select direct children.
      .append('text')
        .style('fill', 'green')
        .style('font-size', '20px')
        .text('A')
    selectAll('g')
        .insert('text', 'circle')  // Insert before 'circle'.
        .text('B')
    selectAll('text')
        .remove()

    const previous = root.selectAll("rect:last-child").select(function(d, i, group) {  // Evaluated for each selected element.
      return this.previousElementSibling  // Return an element, or null.
    })
    select(previous.node().parentNode)
      .append('text')
      .style('fill', 'green')
      .attr('y', 25)
      .text('rect:last-child -> previousElementSibling')

    // .each()
    root.selectAll('circle')
      .each(function(d, i) {
        const odd = i % 2 === 1;
        select(this)
          .style('fill', odd ? 'orange' : '#ddd')
          .attr('r', odd ? 40 : 20)
      })

    // .call()
    root.selectAll('circle')
      .call(selections => {  // The selections as passing arguments.
        selections.style('fill', 'blue')
      })
    
    // .select()
    root.selectAll('circle')
      .select(function(d, i) {
        return i % 2 === 1 ? this : null
      })
      .style('fill', 'grey')

    // .filter()
    root.selectAll('circle')
      .filter((d, i) => {
        return i % 2 === 0
      })
      .style('fill', 'purple')

    console.log(select('g').html())  // Plain HTML returned.

    /**
     * Section 3
     */

    root = select('.section-3')
    // .raise()
    root.selectAll('g.rects > rect').on('click', function(evt, d) {
      select(this).raise()  // The clicked one would be on the top.
    })

    // .lower()
    root.select('button.lower').on('click', (evt, d) => {
      selectAll('g.rects > rect').lower()  // Reverse the position of the selected elements.
    })

    // .order()
    const stats = ["f", "b", "e", "a", "c", "d"]
    root.select('g.rects')
      .selectAll("text")
      .data(stats)
      .join('text')
      .style('fill', 'green')
      .style('font-size', '20px')
      .attr('x', (d, i) => 15 * i)
      .text((d) => d);
    root.select('button.order').on('click', (evt, d) => {
      stats.sort()
      selectAll("g.rects > text")
        .data(stats, d => d)
        .attr('x', (d, i) => 15 * i)
        .order()  // Re-insert the element in the same order as the array items.
    })
  }, [])

  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1</p>
        <input type="checkbox"></input>
        <span></span>
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
            <circle cx="220" />
            <circle cx="440" />
            <g>
              <rect x="630" width="30" height="30" rx="5" />
              <rect x="0" width="40" height="10" rx="0" />
            </g>
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
          <g className="rects">
            <rect fill="red" x="370" width="30" height="30" rx="5" />
            <rect fill="yellow" x="390" width="30" height="30" rx="5" />
            <rect fill="green" x="410" width="30" height="30" rx="5" />
          </g>
        </svg>
        <button className="order">order()</button>
        <button className="lower">lower()</button>
      </div>
    </div>
  )
}

