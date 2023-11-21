import { useEffect } from "react"
import { 
  select, 
  rgb,
  easeBackInOut,
  easeBack,
  easeBackIn,
  easeBounce,
  easeBounceIn,
  easeBounceInOut,
  easeBounceOut,
  easeBackOut,
  easeCircle,
  easeCircleIn,
  easeCircleInOut,
  easeCircleOut,
  easeCubic,
  easeCubicIn,
  easeCubicInOut,
  easeCubicOut,
  easeElastic,
  easeElasticIn,
  easeElasticInOut,
  easeElasticOut,
  easeExp,
  easeExpIn,
  easeExpInOut,
  easeExpOut,
  easeLinear,
  easePolyOut,
  easePoly,
  easePolyIn,
  easePolyInOut,
  easeQuad,
  easeQuadIn,
  easeQuadInOut,
  easeQuadOut,
  easeSin,
  easeSinIn,
  easeSinInOut,
  easeSinOut,
  interpolate,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Section 1
     */
    {
      const random = x => Math.floor(Math.random() * x)
      const update = () => {
        const data = []
        for (let i = 0; i < 5; i++) {
          data.push({
            x: random(800),
            r: random(40),
            fill: rgb(random(255), random(255), random(255))
          })
        }
        select('.section-1 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.6')
          .attr('cy', 50)
          // Returns a 'transition selection', -
          // subsequent calls to .attr and .style will animate attributes and style, respectively.
          .transition()  
          .duration(1200)  // Control transition duration.
          .attr('cx', d => d.x)
          .transition()  
          .duration(500)  // Chained transition.
          .attr('r', d => d.r)
          .style('fill', d => d.fill)
      }
      update()
      select('.section-1 > button').on('click', update)
    }

    /**
     * Section 2
     */
    {
      let data = [], side = 'right'
      const update = () => {
        data = []
        side = side === 'left' ? 'right' : 'left'
        for(let i = 0; i < 10; i++) {
          data.push(side === "left" ? 250 - i * 25 : 775 - i * 25)
        }
        select('.section-2 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .style('opacity', '.6')
          .attr('cy', 50)
          .attr('r', 20)
          .style('fill', 'purple')
          .transition()  
          .delay((d, i) => i * 100)  // Control transition delay.
          .attr('cx', d => d)
      }
      update()
      select('.section-2 > button').on('click', update)
    }

    /**
     * Section 3
     */
    {
      const easing = [
        easeBack, 
        easeBackIn,
        easeBackInOut,
        easeBackOut, 
        easeBounce,
        easeBounceIn,
        easeBounceInOut, 
        easeBounceOut,
        easeCircle,
        easeCircleIn, 
        easeCircleInOut,
        easeCircleOut, 
        easeCubic,
        easeCubicIn,
        easeCubicInOut,
        easeCubicOut,
        easeElastic,
        easeElasticIn,
        easeElasticInOut,
        easeElasticOut,
        easeExp,
        easeExpIn,
        easeExpInOut,
        easeExpOut,
        easeLinear,
        easePoly,
        easePolyOut,
        easePolyIn,
        easePolyInOut,
        easeQuad,
        easeQuadIn,
        easeQuadInOut,
        easeQuadOut,
        easeSin,
        easeSinIn,
        easeSinInOut,
        easeSinOut,
      ]
      let side = 'left', data = 0
      const joinedData = Array(easing.length)
      select('.section-3 > svg > g')
        .selectAll('text')
        .data(joinedData)
        .join('text')
        .attr('transform', 'rotate(-90)')
        .style('opacity', .4)
        .text((d, i) => {
          return easing[i].toString().match(/function (?<name>[a-zA-Z]+)\(/)?.groups?.name ?? 'linear'
        })
        .attr('x', -230)
        .attr('y', (d, i) => i * 40)
      const update = () => {
        select('.section-3 > svg > g')
          .selectAll('circle')
          .data(joinedData)
          .join('circle')
          .each(function(d, i) {
            select(this)
              .style('fill', 'orange')
              .attr('cx', i * 40)
              .attr('r', 15)
              .transition()
              .duration(800)
              .ease(easing[i])
              .attr('cy', data)
          })
        side = side === 'left' ? 'right' : 'left'
        data = side === 'left' ? 0 : 400
      }
      select('.section-3 > button').on('click', update)
      update()
    }
    
    /**
     * Section 4
     */
    {
      let data = [], majorRadius = 100
      const updateData = () => {
        data = [Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI]
      }
      const getCurrentAngle = el => {
        const x = select(el).attr('cx')
        const y = select(el).attr('cy')
        return Math.atan2(y, x)
      }
      const update = () => {
        select('.section-4 > svg > g')
          .selectAll('circle')
          .data(data)
          .join('circle')
          .attr('r', 7)
          .transition()
          .duration(1000)
          .tween('circumference', function(d) {
            const currentAngle = getCurrentAngle(this)
            let targetAngle = d
            if (targetAngle - currentAngle > Math.PI) {
              targetAngle -= 2 * Math.PI
            } else if (targetAngle - currentAngle < -Math.PI) {
              targetAngle += 2 * Math.PI
            }
            // The function iinterpolator accepts a number between 0 and 1 and interpolates between the two values.
            const interpolator = interpolate(currentAngle, targetAngle)
            // Returns a tween function which will get called at each step of the transition.
            return function(t) {
              const angle = interpolator(t)
              select(this)
                .attr('cx', majorRadius * Math.cos(angle))
                .attr('cy', majorRadius * Math.sin(angle))
            }
          })
      }
      const updateAll = () => {
        updateData()
	      update()
      }
      select('.section-4 > button').on('click', updateAll)
      updateAll()
    }

    /**
     * Section 5
     */
    {
      let data = []
      const updateData = () => {
        data = []
        const numItems = Math.ceil(Math.random() * 10)
        for (let i = 0; i < numItems; i++) {
          data.push(Math.random() * 800)
        }
      }
      const update = () => {
        select('.section-5 > svg > g')
          .selectAll('circle')
          .data(data)
          .join(
            enter => {
              // Initial states without transition.
              return enter.append('circle')
                .attr('cy', 50)  
                .attr('cx', d => d)
                .attr('r', 40)
                .style('opacity', 0)
            }, 
            update => update,
            exit => {
              return exit.transition()
                .duration(1000)
                .attr('cy', 500)
                .remove()  // Remove the element from the screen.
            }
          )
          .style('fill', 'orange')
          // Apply a transition to both entering and updating elements.
          .transition()
          .duration(1000)
          .attr('cx', d => d)
          .style('opacity', 0.75)
      }
      const updateAll = () => {
        updateData()
	      update()
      }
      select('.section-5 > button').on('click', updateAll)
      updateAll()
    }
  }, [])
  
  return (
    <div className="selection">
      <div className="section-1">
        <p>Section 1 - Chained Transition</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
        <button>Update</button>
      </div>
      <div className="section-2">
        <p>Section 2 - delay</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
        <button>Update</button>
      </div>
      <div className="section-3">
        <p>Section 3 - Easing</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 1500 480" 
          width="1500" 
          height="510" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
        <button>Update</button>
      </div>
      <div className="section-4">
        <p>Section 4 - Custom Tweens</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 280" 
          width="760" 
          height="280" 
          xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="100" style={{ fill: 'none', stroke: '#ccc', strokeDasharray: '1,1'}} />
            <g transform="translate(150, 150)"></g>
        </svg>
        <button>Update</button>
      </div>
      <div className="section-5">
        <p>Section 5 - Entering / Exiting Elements</p>
        <svg 
          preserveAspectRatio="xMinYMax meet" 
          viewBox="0 0 760 140" 
          width="760" 
          height="140" 
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 50)">
          </g>  
        </svg>
        <button>Update</button>
      </div>
    </div>
  )
}

