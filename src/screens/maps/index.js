import { useEffect } from "react"
import geojson from './geojson.json'
import geojsonAfrica from './geojson-africa.json'
import { 
  select, 
  geoEquirectangular,
  geoPath,
  geoCircle,
  geoGraticule,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoGnomonic,
  geoOrthographic,
  geoStereographic,
  geoAlbers,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant,
  geoMercator,
  geoTransverseMercator,
  geoInterpolate,
  pointer,
  geoContains,
} from "d3"
import "./styles.css"

export default () => {
  useEffect(() => {
    /**
     * Mapping concepts:
     *   - GeoJSON: a JSON-based format for specifying geographic data.
     *   - Projections: functions that convert from latitude/longitude co-ordinates to x & y co-ordinates.
     *   - Geographic Path Generators: functions that convert GeoJSON shapes into SVG or Canvas paths.
     */  
     
    /**
     * Section 1
     */
    {
      const geoJson = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "Africa"
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[-6, 36], [33, 30], [43, 11], [51, 12], [29, -33], [18, -35], [7, 5], [-17, 14], [-6, 36]]]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Australia"
            },
            "geometry": {
              "type": "Polygon",  // Rendered as SVG lines.
              "coordinates": [[[143, -11], [153, -28], [144, -38], [131, -31], [116, -35], [114, -22], [136, -12], [140, -17], [143, -11]]]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Timbuktu"
            },
            "geometry": {
              "type": "Point",  // Rendered as SVG arcs.
              "coordinates": [-3.0026, 16.7666]
            }
          }
        ]
      }
      const projection = geoEquirectangular()
        .scale(200)
        .translate([100, 150])
      const geoGenerator = geoPath()  // GeoJSON -> SVG / Canvas paths.
        // The geographic path generator renders polygons as line segments and points as arcs.
        // We can set the radius of the circles using ".pointRadius()".
        .pointRadius(15)
        .projection(projection)
      select('.section-1 > svg > g')
        .selectAll('path')
        .data(geoJson.features)
        .join('path')
        .style('fill', 'lightgrey')
        .style('stroke', '#aaa')
        .attr('d', geoGenerator)
    }

    /**
     * Section 2
     */
    {
      const projections = [
        { type: 'AzimuthalEqualArea', scale: 100, projection: geoAzimuthalEqualArea },
        { type: 'AzimuthalEquidistant', scale: 80, projection: geoAzimuthalEquidistant },
        { type: 'Gnomonic', scale: 100, projection: geoGnomonic },
        { type: 'Orthographic', scale: 160, projection: geoOrthographic },
        { type: 'Stereographic', scale: 100, projection: geoStereographic },
        { type: 'Albers', scale: 120, projection: geoAlbers },
        { type: 'ConicConformal', scale: 100, projection: geoConicConformal },
        { type: 'ConicEqualArea', scale: 100, projection: geoConicEqualArea },
        { type: 'ConicEquidistant', scale: 100, projection: geoConicEquidistant },
        { type: 'Equirectangular', scale: 80, projection: geoEquirectangular },
        { type: 'Mercator', scale: 70, projection: geoMercator },
        { type: 'TransverseMercator', scale: 70, projection: geoTransverseMercator },
      ]
      const circles = [[0, 0], [-90, 0], [-45, 0], [45, 0], [90, 0], [0, -70], [0, -35], [0, 35], [0, 70]]
      const d3GeoCircle = geoCircle().radius(10).precision(1)
      const d3GeoGraticule = geoGraticule()
      const width = 200, height = 200, globalScale = 0.5
      function updateCanvas(d) {
        const context = this.getContext('2d')
        const projection = d.projection()
          .scale(globalScale * d.scale)  // Scale factor of the projection.
          .center([0, 0])  // Projection center [longitude, latitude].
          .rotate([0.1, 0, 0])  // Rotation of the projection [lambda, phi, gamma] (or [yaw, pitch, roll]).
          .translate([0.5 * width, 0.5 * height])  // Pixel [x,y] location of the projection center.
        const geoGenerator = geoPath()
          .projection(projection)
          .context(context)
        context.lineWidth = 0.5

        // Graticule.
        context.strokeStyle = '#ccc'
        context.fillStyle = 'none'
        context.setLineDash([1, 1])
        context.beginPath()
        geoGenerator(d3GeoGraticule())
        context.stroke()
      
        // World.
        context.fillStyle = '#eee'
        context.setLineDash([])
        context.beginPath()
        geoGenerator({ type: 'FeatureCollection', features: geojson.features })
        context.fill()
        context.stroke()

        // Circles.
        context.strokeStyle = '#888'
        context.fillStyle = 'none'
        circles.forEach(center => {
          d3GeoCircle.center(center)
          context.beginPath()
          geoGenerator(d3GeoCircle())
          context.stroke()
        })

        // Projection label.
        context.fillStyle = '#333'
        context.font = '14px sans-serif'
        context.fillText('geo' + d.type, 6, 17)
      } 
      select('.section-2 > div.content')
        .selectAll('canvas')
        .data(projections)
        .join('canvas')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
        .each(updateCanvas)
    }

    /**
     * Section 3
     */
    {
      const projectionTypes = {
        'AzimuthalEqualArea': geoAzimuthalEqualArea,
        'AzimuthalEquidistant': geoAzimuthalEquidistant,
        'Gnomonic': geoGnomonic,
        'Orthographic': geoOrthographic,
        'Stereographic': geoStereographic,
        'Albers': geoAlbers,
        'ConicConformal': geoConicConformal,
        'ConicEqualArea': geoConicEqualArea,
        'ConicEquidistant': geoConicEquidistant,
        'Equirectangular': geoEquirectangular,
        'Mercator': geoMercator,
        'TransverseMercator': geoTransverseMercator
      }
      let projection
      const geoGenerator = geoPath()
        .projection(projection)
      const graticule = geoGraticule()
      const circles = [
        [-135, 0], [-90, 0], [-45, 0], [0, 0], [45, 0], [90, 0], [135, 0], [180, 0],
        [0, -70], [0, -35], [0, 35], [0, 70],
        [180, -70], [180, -35], [180, 35], [180, 70],
      ]
      const d3GeoCircle = geoCircle().radius(10).precision(1)
      const state = {
        type: 'AzimuthalEqualArea',
        scale: 120,
        translateX: 450,
        translateY: 250,
        centerLon: 0,
        centerLat: 0,
        rotateLambda: 0.1,
        rotatePhi: 0,
        rotateGamma: 0
      }
      
      // Init menu.
      select('.section-3 > div.menu')
        .selectAll('.slider.item input')
        .on('input', function(d) {
          const attr = select(this).attr('name')
          state[attr] = this.value
          select(this.parentNode.parentNode).select('.value').text(this.value)
          update()
        })

      select('.section-3 > div.menu .projection-type select')
        .on('change', function(d) {
          state.type = this.options[this.selectedIndex].value
          update()
        })
        .selectAll('option')
        .data(Object.keys(projectionTypes))
        .enter()
        .append('option')
        .attr('value', d => d)
        .text(d => d)
      
      function update() {
        // Update projection
        projection = projectionTypes[state.type]()
          .scale(state.scale)
          .translate([state.translateX, state.translateY])
          .center([state.centerLon, state.centerLat])
          .rotate([state.rotateLambda, state.rotatePhi, state.rotateGamma])
        geoGenerator.projection(projection)

        // Update world map.
        select('g.map')
          .selectAll('path')
          .data(geojson.features)
          .join('path')
          .attr('d', geoGenerator)
            
        // Update projection center.
        let projectedCenter = projection([state.centerLon, state.centerLat])
        select('.projection-center')
          .attr('cx', projectedCenter[0])
          .attr('cy', projectedCenter[1])
      
        // Update graticule.
        select('.graticule path')
          .datum(graticule())
          .attr('d', geoGenerator)
      
        // Update circles.
        select('.circles')
          .selectAll('path')
          .data(circles.map(d => {
            d3GeoCircle.center(d)
            return d3GeoCircle()
          }))
          .join('path')
          .attr('d', geoGenerator)
      }
      update()
    }

    /**
     * Code 1
     */
    {
      const projection = geoAzimuthalEqualArea()
      const projectedCoordinates = projection([-3.0026, 16.7666])
      console.log(projectedCoordinates)
      const origianlCoordinates = projection.invert(projectedCoordinates)
      console.log(origianlCoordinates)
    }

    /**
     * Section 4
     */
    {
      const context = select('.section-4 > canvas')
        .node()
        .getContext('2d')
      const projection = geoEquirectangular()
      const geoGenerator = geoPath()
        .projection(projection)
        .context(context)
      
      // Sets the projection's scale and translate such that the geometry fits within a given bounding box.
      projection.fitExtent([[20, 20], [620, 420]], geojson)
      context.lineWidth = 0.5
      context.strokeStyle = '#888'
      context.beginPath()
      geoGenerator({ type: 'FeatureCollection', features: geojson.features })
      context.stroke()
      context.beginPath()
      context.setLineDash([2, 2])
      context.rect(20, 20, 600, 400)
      context.stroke()
    }

    /**
     * Section 5
     */
    {
      const projection = geoEquirectangular()
        .scale(200)
        .translate([200, 150])
      const context = select('.section-5 > canvas')
        .node()
        .getContext('2d')
      const geoGenerator = geoPath()  // GeoJSON -> SVG / Canvas paths.
        .projection(projection)
        .context(context)
      context.lineWidth = 0.5
      context.strokeStyle = '#aaa'
      context.beginPath()  // Begin drawing.
      geoGenerator({ type: 'FeatureCollection', features: geojson.features })
      context.stroke()
    }

    /**
     * Section 6
     */
    {
      const projection = geoMercator()
        .scale(400)
        .translate([200, 280])
        .center([0, 5])
      const geoGenerator = geoPath()
        .projection(projection)
  
      const handleMouseover = (e, d) => {
        // Compute the feature's area (in pixels).
        const pixelArea = geoGenerator.area(d)

        // Compute the feature's bounds (in pixel co-ordinates).
        const bounds = geoGenerator.bounds(d)

        // Compute the feature's centroid (in pixel co-ordinates).
        const centroid = geoGenerator.centroid(d)

        // Compute the path length (in pixels).
        const measure = geoGenerator.measure(d)
      
        select('.section-6 .info')
          .text(d.properties.name + ' (path.area = ' + pixelArea.toFixed(1) + ' path.measure = ' + measure.toFixed(1) + ')')
        select('.section-6 .bounding-box rect')
          .attr('x', bounds[0][0])
          .attr('y', bounds[0][1])
          .attr('width', bounds[1][0] - bounds[0][0])
          .attr('height', bounds[1][1] - bounds[0][1])
        select('.section-6 .centroid')
          .style('display', 'inline')
          .attr('transform', 'translate(' + centroid + ')')
      }
      select('.section-6 g.map')
        .selectAll('path')
        .data(geojsonAfrica.features)
        .join('path')
        .attr('d', geoGenerator)
        .on('mouseover', handleMouseover)
    }

    /**
     * Section 7
     */
    {
      const context = select('.section-7 > canvas')
        .node()
        .getContext('2d')
      const projection = geoOrthographic()
        .scale(500)
        .rotate([30, -45])
      const geoGenerator = geoPath()
        .projection(projection)
        .context(context)

      // Render.
      context.lineWidth = 0.5
      context.strokeStyle = '#333'
      context.beginPath()
      geoGenerator({ type: 'FeatureCollection', features: geojson.features })
      context.stroke()

      // Graticule.
      const graticule = geoGraticule()
      context.beginPath()
      context.strokeStyle = '#ccc'
      geoGenerator(graticule())
      context.stroke()

      // Add a line from London to New York.
      context.beginPath()
      context.strokeStyle = 'red'
      geoGenerator({ 
        type: 'Feature', 
        geometry: { 
          type: 'LineString', 
          coordinates: [
            [0.1278, 51.5074], 
            [-74.0059, 40.7128]
          ]
        }
      })
      context.stroke()

      // Add a circle.
      const circle = geoCircle().center([0.1278, 51.5074]).radius(5)
      context.beginPath()
      context.strokeStyle = 'red'
      geoGenerator(circle())
      context.stroke()
    }

    /**
     * Section 8
     */
    {
      const context = select('.section-8 > canvas')
        .node()
        .getContext('2d')
      const projection = geoOrthographic()
        .scale(500)
        .rotate([30, -45])
      const geoGenerator = geoPath()
        .projection(projection)
        .context(context)

      // Render.
      context.lineWidth = 0.5
      context.strokeStyle = '#333'
      context.beginPath()
      geoGenerator({ type: 'FeatureCollection', features: geojson.features })
      context.stroke()

      // Graticule.
      const graticule = geoGraticule()
      context.beginPath()
      context.strokeStyle = '#ccc'
      geoGenerator(graticule())
      context.stroke()

      // Add a line from London to New York.
      context.beginPath()
      context.strokeStyle = 'red'
      const londonLonLat = [0.1278, 51.5074]
      const newYorkLonLat = [-74.0059, 40.7128]
      geoGenerator({ 
        type: 'Feature', 
        geometry: { 
          type: 'LineString', 
          coordinates: [
            londonLonLat, 
            newYorkLonLat
          ]
        }
      })
      context.stroke()

      // Accepts input between 0 and 1 and interpolates between two [lon, lat] locations.
      const geoInterpolator = geoInterpolate(londonLonLat, newYorkLonLat)
      context.beginPath()
      context.fillStyle = 'red'
      geoGenerator({ 
        type: 'Feature', 
        geometry: {
          type: 'Point', 
          coordinates: geoInterpolator(.4)
        }
      })
      context.fill()
    }

    /**
     * Section 9
     */
    {
      const context = select('.section-9 > canvas')
        .node()
        .getContext('2d')
      const projection = geoOrthographic()
        .scale(300)
        .rotate([30, -45])
      const geoGenerator = geoPath()
        .projection(projection)
        .context(context)
      const state = {
        clickedLocation: null
      }
      function handleClick(e) {
        const pos = pointer(e, this)
        state.clickedLocation = projection.invert(pos)
        update()
      }
      function initialise() {
        select('.section-9 > canvas')
          .on('click', handleClick)
      }
      function update() {
        context.clearRect(0, 0, 800, 400)
        geojson.features.forEach(d => {
          context.beginPath()
          // Check whether mouse or touch events occur inside the boundary of a feature.
          context.fillStyle = state.clickedLocation && geoContains(d, state.clickedLocation) ? 'red' : '#aaa'
          geoGenerator(d)
          context.fill()
        })
      }
      initialise()
		  update()
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
          <g>
          </g>  
        </svg>
      </div>
      <div className="section-2">
        <p>Section 2 - Projections</p>
        <div className="content"></div>
      </div>
      <div className="section-3">
        <p>Section 3 - Projection Explorer</p>
        <div className="menu">
          <div className="projection-type item">
            <div><select name="type" defaultValue="150"></select></div>
          </div>
          <div className="slider item">
            <div className="label">scale (<span className="value">120</span>)</div>
            <div><span className="low">0</span> <input type="range" name="scale" min="0" max="400" defaultValue="120"></input> <span>400</span></div>
          </div>
          <div className="slider item">
            <div className="label">center (lon) (<span className="value">0</span>)</div>
            <div><span className="low">-180</span> <input type="range" name="centerLon" min="-180" max="180" defaultValue="0"></input> <span>180</span></div>
          </div>
          <div className="slider item">
            <div className="label">center (lat) (<span className="value">0</span>)</div>
            <div><span className="low">-90</span> <input type="range" name="centerLat" min="-90" max="90" defaultValue="0"></input> <span>90</span></div>
          </div>
          <div className="slider item">
            <div className="label">translate (x) (<span className="value">480</span>)</div>
            <div><span className="low">0</span> <input type="range" name="translateX" min="0" max="960" defaultValue="480"></input> <span>960</span></div>
          </div>
          <div className="slider item">
            <div className="label">translate (y) (<span className="value">250</span>)</div>
            <div><span className="low">0</span> <input type="range" name="translateY" min="0" max="500" defaultValue="250"></input> <span>500</span></div>
          </div>
          <div className="slider item">
            <div className="label">rotate (λ) (<span className="value">0</span>)</div>
            <div><span className="low">-180</span> <input type="range" name="rotateLambda" min="-180" max="180" defaultValue="0"></input> <span>180</span></div>
          </div>
          <div className="slider item">
            <div className="label">rotate (φ) (<span className="value">0</span>)</div>
            <div><span className="low">-180</span> <input type="range" name="rotatePhi" min="-180" max="180" defaultValue="0"></input> <span>180</span></div>
          </div>
          <div className="slider item">
            <div className="label">rotate (γ) (<span className="value">0</span>)</div>
            <div><span className="low">-180</span> <input type="range" name="rotateGamma" min="-180" max="180" defaultValue="0"></input> <span>180</span></div>
          </div>
        </div>
        <svg width="900px" height="500px">
          <g className="graticule"><path></path></g>
          <g className="circles"></g>
          <g className="map"></g>
          <circle className="projection-center" r="4"></circle>
        </svg>
      </div>
      <div className="section-4">
        <p>Section 4 - fitExtent</p>
        <canvas width={640} height={440}></canvas>
      </div>
      <div className="section-5">
        <p>Section 5 - Simple Canvas Rendering</p>
        <canvas width={640} height={440}></canvas>
      </div>
      <div className="section-6">
        <p>Section 6 - Path Geometry</p>
        <div className="info">Hover over a country:</div>
        <svg width="620px" height="600px">
          <g className="map"></g>
          <g className="bounding-box"><rect></rect></g>
          <g className="centroid"><circle r="4"></circle></g>
        </svg>
      </div>
      <div className="section-7">
        <p>Section 7 - Shapes</p>
        <canvas width="800" height="400"></canvas>
      </div>
      <div className="section-8">
        <p>Section 8 - Interpolation</p>
        <canvas width="800" height="400"></canvas>
      </div>
      <div className="section-9">
        <p>Section 9 - geoContains</p>
        <div>Click an area to highlight:</div>
        <canvas width="800" height="400"></canvas>
      </div>
    </div>
  )
}

