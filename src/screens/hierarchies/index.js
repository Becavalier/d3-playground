import { useEffect } from "react"
import { 
  select, 
  selectAll, 
  rollup,
  sum,
  hierarchy,
  tree,
  cluster,
  pack,
  treemap,
  treemapDice,
  treemapBinary,
  treemapSlice,
  treemapSliceDice,
  treemapSquarify,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    const flatData = [
      {
        "Title": "Adaptation",
        "Distributor": "Sony Pictures",
        "Genre": "Comedy",
        "Worldwide_Gross": 22498520,
        "Rating": 91
      },
      {
        "Title": "Air Bud",
        "Distributor": "Walt Disney Pictures",
        "Genre": "Comedy",
        "Worldwide_Gross": 27555061,
        "Rating": 45
      },
      {
        "Title": "Air Force One",
        "Distributor": "Sony Pictures",
        "Genre": "Action",
        "Worldwide_Gross": 315268353,
        "Rating": 78
      }
    ]

    const structuralData = {
      "name": "A1",
      "children": [
        {
          "name": "B1",
          "children": [
            {
              "name": "C1",
              "value": 100
            },
            {
              "name": "C2",
              "value": 300
            },
            {
              "name": "C3",
              "value": 200
            }
          ]
        },
        {
          "name": "B2",
          "value": 200
        }
      ]
    }

    /**
     * Case 1
     */
    {
      const groups = rollup(
        flatData, 
        // A reduce function that takes an array of values and outputs a single value.
        (group) => sum(group, d => d.Worldwide_Gross), 
        // Grouping by below fields.
        d => d.Distributor, 
        d => d.Genre)
      console.log(groups.get('Sony Pictures').get('Action'))  // Getter function.

      /**
       * "hierarchy()" - constructs a root node from the specified hierarchical data.
       */
      const root = hierarchy(groups)
      /**
       * Evaluates the specified value function for this node and each descendant in post-order traversal, and returns this node.
       * The `node.value` property of each node is set to the numeric value returned by the specified function plus the combined value of all descendants.
       */
      root.sum((d) => {  // Propagate the sum value back up the tree.
        const [groupName, groupValue] = d
        return groupValue
      })
      console.log(root)
    }

    /**
     * Section 1
     */
    {
      const root = hierarchy(structuralData)
      const treeLayout = tree()
      treeLayout.size([400, 200])
      treeLayout(root)  // Write x and y values on each node of root.
      
      // Draw the nodes.
      select('.section-1 > svg > g > g.nodes')
        .selectAll('circle')
        // Returns the array of descendant nodes, starting with this node, - 
        // then followed by each child in topological order.
        .data(root.descendants())
        .join('circle')
        .style('fill', 'orange')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 10)

      // Draw the links.
      select('.section-1 > svg > g > g.links')
        .selectAll('line')
        // Returns an array where each element is an object containing two properties -
        // source and target which represent the link's source and target nodes.
        .data(root.links())
        .join('line')
        .style('stroke', 'black')
        .style('stroke-width', '2px')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
    }

    /**
     * Section 2
     */
    {
      const root = hierarchy(structuralData)
      const clusterLayout = cluster()  // All leaf nodes are placed at the same depth.
      clusterLayout.size([400, 200])
      clusterLayout(root)
      
      // Draw the nodes.
      select('.section-2 > svg > g > g.nodes')
        .selectAll('circle')
        .data(root.descendants())
        .join('circle')
        .style('fill', 'orange')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 10)

      // Draw the links.
      select('.section-2 > svg > g > g.links')
        .selectAll('line')
        .data(root.links())
        .join('line')
        .style('stroke', 'black')
        .style('stroke-width', '2px')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
    }

    /**
     * Section 2
     */
    {
      const root = hierarchy(structuralData)
      root.sum(d => d.value)
      const treeMapLayout = treemap()  // All leaf nodes are placed at the same depth.
      treeMapLayout.size([400, 200])
        .paddingOuter(20)  // The padding around a node's children.
        .paddingInner(5)  // The padding between sibling nodes.
        // .padding(20)  // For both "paddingOuter" and "paddingInner".
        
      const update = (arrangeStrategy = treemapBinary) => {
        treeMapLayout.tile(arrangeStrategy)  // Select a tiling strategy.
        treeMapLayout(root)
        const nodes = select('.section-3 > svg > g')
          .selectAll('g')
          .data(root.descendants())
          .join('g')
          .attr('transform', d => 'translate(' + [d.x0, d.y0] + ')')

        nodes.selectAll('rect').remove()
        nodes.selectAll('text').remove()
        nodes.append('rect')
          .style('stroke', 'white')
          .style('fill', 'cadetblue')
          .style('stroke', 'white')
          .style('opacity', '0.3')
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0)
        nodes.append('text')
          .attr('dx', 4)
          .attr('dy', 14)
          .style('fill', 'white')
          .style('font-size', '12px')
          .text(d => d.data.name)
      }    
      update()
      selectAll('input[name="tree-strategy"]').on('click', (evt) => {
        update([
          treemapBinary,
          treemapDice,
          treemapSlice,
          treemapSliceDice,
          treemapSquarify,
        ][+evt.target.value])
      })
    }
  
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
            <g className="links"></g>
            <g className="nodes"></g>
          </g>  
        </svg>
      </div>
      <div className="section-2">
        <p>Section 2</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
            <g className="links"></g>
            <g className="nodes"></g>
          </g>  
        </svg>
      </div>
      <div className="section-3">
        <p>Section 3</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 340" 
          width="760" 
          height="340" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
        <fieldset>
          <legend>Select a strategy:</legend>
          <div>
            <input type="radio" id="treemapBinary" name="tree-strategy" value="0" />
            <label htmlFor="treemapBinary"><b>treemapBinary</b>: strives for a balance between horizontal and vertical partition.</label>
          </div>
          <div>
            <input type="radio" id="treemapDice" name="tree-strategy" value="1" />
            <label htmlFor="treemapDice"><b>treemapDice</b>: partitions horizontally.</label>
          </div>
          <div>
            <input type="radio" id="treemapSlice" name="tree-strategy" value="2" />
            <label htmlFor="treemapSlice"><b>treemapSlice</b>: partitions vertically.</label>
          </div>
          <div>
            <input type="radio" id="treemapSliceDice" name="tree-strategy" value="3" />
            <label htmlFor="treemapSliceDice"><b>treemapSliceDice</b>: alternates between horizontal and vertical partioning.</label>
          </div>
          <div>
            <input type="radio" id="treemapSquarify" name="tree-strategy" value="4" />
            <label htmlFor="treemapSquarify"><b>treemapSquarify</b>: allows the aspect ratio of the rectangles to be influenced.</label>
          </div>
        </fieldset>
      </div>
    </div>
  )
}

