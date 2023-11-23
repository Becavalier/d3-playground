import { useEffect } from "react"
import { 
  select, 
  selectAll, 
  selection, 
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
  scaleLinear,
  hierarchy,
} from "d3";
import "./styles.css"

export default () => {
  useEffect(() => {
    
    /**
     * Section 1
     */
    const structuralData = {
      "name": "A1",
      "children": [
        {
          "name": "B1",
          "children": [
            {
              "name": "C1",
              "value": 300
            },
            {
              "name": "C2",
              "value": 100
            },
          ]
        },
        {
          "name": "B2",
          "value": 200,
          "children": [
            {
              "name": "C3",
              "value": 200
            },
            {
              "name": "C4",
              "value": 100
            },
            {
              "name": "C5",
              "value": 500
            },
          ]
        }
      ]
    }
    const root = hierarchy(structuralData)
    root.sum(d => d.value)

    // Collect.
    const barHeight = 60
    const barWidth = 180
    const barHorizontalGap = 20
    const barVerticalGap = 15
    const colorScale = ['orange', 'lightblue', 'pink']
    const scaleFn = (max) => scaleLinear().domain([0, max]).range([0, barWidth])
    const obj = {}
    const decorate = (root, obj) => {
      const { depth, height, value, data, parent, rectWidth, level, } = root
      obj.depth = depth
      obj.rectWidth = rectWidth ?? barWidth
      obj.height = height
      obj.value = value
      obj.data = data
      obj.parent = parent
      obj.parentName = parent?.data?.name ?? 'root'
      obj.level = level ?? 0
      if (root.children) {
        obj.children = []
        const sortedChildren = root.children.sort((x, y) => x.value - y.value).map((i, idx) => ({ ...i, level: idx }))
        const scale = scaleFn(sortedChildren[sortedChildren.length - 1].value)
        root.children = sortedChildren.map(i => ({ ...i, rectWidth: scale(i.value) }))
        root.children.forEach((node, idx) => {
          if (!obj.children[idx]) obj.children[idx] = {}
          decorate(node, obj.children[idx])
        })
      } 
    }
    decorate(root, obj)

    const nodes = []
    const collect = (root) => {
      nodes.push(root)
      if (root.children) {
        root.children.forEach(n => collect(n))
      }
    }
    collect(obj)
  
    let visibleParents = []
    const update = () => {
      const validData = nodes.filter(d => d.parentName === 'root' || visibleParents[d.depth - 1] === d.parentName)
      select('.section-1 > svg > g')
        .selectAll('rect')
        .data(validData)
        .join('rect')
        .style('stroke', d => {
          return visibleParents[d.depth] === d.data.name ? 'red' : 'white'
        })
        .style('fill', d => colorScale[d.depth])
        .on('click', (evt, d) => {
          visibleParents[d.depth] = d.data.name
          visibleParents = visibleParents.slice(0, d.depth + 1)
          update()
        })
        .style('opacity', .8)
        .attr('x', d => d.depth * (barWidth + barHorizontalGap))
        .attr('y', d => d.level * (barHeight + barVerticalGap))
        .style('cursor', 'pointer')
        .attr('width', d => d.rectWidth)
        .attr('height', barHeight)
      
      select('.section-1 > svg > g')
        .selectAll('text')
        .data(validData)
        .join('text')
        .style('font-size', '20px')
        .text(d => `${d.data.name} - ${d.value}`)
        .attr('x', d => d.depth * (barWidth + barHorizontalGap))
        .attr('y', d => d.level * (barHeight + barVerticalGap))
        .attr('dy', '1em')
    }
    update()
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 370" 
          width="760" 
          height="370" 
          xmlns="http://www.w3.org/2000/svg">
          <g>
          </g>  
        </svg>
      </div>
    </div>
  )
}

