import { useEffect } from "react"
import { 
  select, 
  chord,
  ribbon,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Section 1
     */
    {
      const data = [
        [10, 20, 30],
        [40, 60, 80],
        [100, 200, 300]
      ];

      const chordGenerator = chord()
      const chords = chordGenerator(data)  // Returns an array of chords.
      // Each element of the array is an object with source and target properties. 
      // Each source and target has startAngle and endAngle properties which will define the shape of each chord.
      console.log(chords)
      const ribbonGenerator = ribbon().radius(150)  // Converts the chord properties into path data.
      select('.section-1 > svg > g')
        .selectAll('path')
        .data(chords)
        .join('path')
        .style('stroke', 'white')
        .style('fill', 'cadetblue')
        .style('stroke', 'white')
        .style('opacity', '0.3')
        .attr('d', ribbonGenerator)
    }
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1 - Chord Diagram</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(160, 170)">
          </g>  
        </svg>
      </div>
    </div>
  )
}

