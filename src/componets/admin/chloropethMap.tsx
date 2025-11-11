import { useEffect, useRef, useState } from "react"
import * as d3 from 'd3'

interface StateData {
  name: string
  code: string
  value: number
}

interface GeoFeature {
  type: string
  properties?: {
    name?: string
  }
  geometry: {
    type: string
    coordinates: number[][][] | number[][][][]
  }
}

interface GeoFeatureCollection {
  type: string
  features: GeoFeature[]
}

interface TopoJSON {
  feature: (topology: unknown, object: unknown) => GeoFeatureCollection
}

declare global {
  interface Window {
    topojson?: TopoJSON
  }
}

const STATES_DATA: StateData[] = [
  { name: "California", code: "CA", value: 20 },
  { name: "New York", code: "NY", value: 10 },
]

const STATE_CODES = new Map([
  ["California", "CA"],
  ["Texas", "TX"],
  ["Florida", "FL"],
  ["New York", "NY"],
  ["Pennsylvania", "PA"],
  ["Illinois", "IL"],
  ["Ohio", "OH"],
  ["Georgia", "GA"],
  ["North Carolina", "NC"],
  ["Michigan", "MI"],
  ["New Jersey", "NJ"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["Arizona", "AZ"],
  ["Massachusetts", "MA"],
  ["Tennessee", "TN"],
  ["Indiana", "IN"],
  ["Maryland", "MD"],
  ["Missouri", "MO"],
  ["Wisconsin", "WI"],
  ["Colorado", "CO"],
  ["Minnesota", "MN"],
  ["South Carolina", "SC"],
  ["Alabama", "AL"],
  ["Louisiana", "LA"],
  ["Kentucky", "KY"],
  ["Oregon", "OR"],
  ["Oklahoma", "OK"],
  ["Connecticut", "CT"],
  ["Utah", "UT"],
  ["Nevada", "NV"],
  ["Arkansas", "AR"],
  ["Mississippi", "MS"],
  ["Kansas", "KS"],
  ["New Mexico", "NM"],
  ["Nebraska", "NE"],
  ["West Virginia", "WV"],
  ["Idaho", "ID"],
  ["Hawaii", "HI"],
  ["New Hampshire", "NH"],
  ["Maine", "ME"],
  ["Iowa", "IA"],
  ["Rhode Island", "RI"],
  ["Montana", "MT"],
  ["Delaware", "DE"],
  ["South Dakota", "SD"],
  ["North Dakota", "ND"],
  ["Alaska", "AK"],
  ["Vermont", "VT"],
  ["Wyoming", "WY"],
])

export default function ChoroplethMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [stateData, setStateData] = useState<Map<string, StateData>>(new Map(STATES_DATA.map((d) => [d.code, d])))
  const [selectedState, setSelectedState] = useState<StateData | null>(STATES_DATA[0])
  const [topology, setTopology] = useState<{ objects: { states: unknown } } | null>(null)
  const [topoJsonLoaded, setTopoJsonLoaded] = useState(false)
  const [tooltipState, setTooltipState] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  })

  // Load TopoJSON library
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js'
    script.async = true
    script.onload = () => setTopoJsonLoaded(true)
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Fetch US topology
  useEffect(() => {
    if (!topoJsonLoaded) return
    
    fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((res) => res.json())
      .then((data: { objects: { states: unknown } }) => setTopology(data))
      .catch((err) => console.error("Error loading topology:", err))
  }, [topoJsonLoaded])

  // Render map with responsive sizing
  useEffect(() => {
    if (!svgRef.current || !topology || !containerRef.current || !topoJsonLoaded) return
    if (!window.topojson) return

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Create main group for continental US
    const mainGroup = svg.append("g")
    // Create separate groups for Alaska and Hawaii
    const alaskaGroup = svg.append("g")
    const hawaiiGroup = svg.append("g")

    // Separate projections for different regions
    const mainProjection = d3
      .geoAlbersUsa()
      .scale((containerWidth / 960) * 1300)
      .translate([containerWidth / 2, containerHeight / 2])

    // Alaska projection
    const alaskaProjection = d3
      .geoAlbers()
      .rotate([154, 0])
      .center([-2, 58.5])
      .parallels([55, 65])
      .scale((containerWidth / 960) * 700)
      .translate([containerWidth * 0.15, containerHeight * 0.85])

    // Hawaii projection
    const hawaiiProjection = d3
      .geoAlbers()
      .rotate([157, 0])
      .center([-3, 19.9])
      .parallels([8, 18])
      .scale((containerWidth / 960) * 1500)
      .translate([containerWidth * 0.3, containerHeight * 0.88])

    const mainPath = d3.geoPath().projection(mainProjection)
    const alaskaPath = d3.geoPath().projection(alaskaProjection)
    const hawaiiPath = d3.geoPath().projection(hawaiiProjection)

    const maxValue = Math.max(...Array.from(stateData.values()).map((d) => d.value))
    const colorScale = d3.scaleLinear<string>().domain([0, maxValue]).range(["#f0f0f0", "#76C2F9"])

    const states = window.topojson.feature(topology, topology.objects.states)

    svg.attr("width", containerWidth).attr("height", containerHeight)

    // Function to render states
    const renderStates = (
      group: d3.Selection<SVGGElement, unknown, null, undefined>,
      path: d3.GeoPath,
      filter?: (name: string) => boolean
    ) => {
      group
        .selectAll("path")
        .data(states.features.filter((d) => !filter || filter(d.properties?.name || "")))
        .enter()
        .append("path")
        .attr("d", (d) => path(d as d3.GeoPermissibleObjects) || "")
        .attr("fill", (d) => {
          const name = d.properties?.name || ""
          const code = STATE_CODES.get(name)
          if (!code) return "#e5e7eb"
          const data = stateData.get(code)
          return data ? colorScale(data.value) : "#e5e7eb"
        })
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.75)
        .style("cursor", "pointer")
        .on("mouseenter", function(event: MouseEvent, d) {
          const name = d.properties?.name || ""
          const code = STATE_CODES.get(name)
          if (code && stateData.has(code)) {
            const data = stateData.get(code)!
            setSelectedState(data)
            d3.select(this).attr("opacity", 0.8)
          }
        })
        .on("mouseleave", function() {
          d3.select(this).attr("opacity", 1)
          setTooltipState({ visible: false, x: 0, y: 0, text: "" })
        })
        .on("mousemove", function(event: MouseEvent, d) {
          const name = d.properties?.name || ""
          const code = STATE_CODES.get(name)
          if (code && stateData.has(code)) {
            const data = stateData.get(code)!
            const [x, y] = d3.pointer(event, container)
            setTooltipState({
              visible: true,
              x: x,
              y: y,
              text: `${data.code}: ${data.value}`,
            })
          }
        })
    }

    // Render continental US (excluding Alaska and Hawaii)
    renderStates(mainGroup, mainPath, (name) => name !== "Alaska" && name !== "Hawaii")
    
    // Render Alaska with its own projection
    renderStates(alaskaGroup, alaskaPath, (name) => name === "Alaska")
    
    // Render Hawaii with its own projection
    renderStates(hawaiiGroup, hawaiiPath, (name) => name === "Hawaii")

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      mainProjection
        .scale((newWidth / 960) * 1300)
        .translate([newWidth / 2, newHeight / 2])

      alaskaProjection
        .scale((newWidth / 960) * 700)
        .translate([newWidth * 0.15, newHeight * 0.85])

      hawaiiProjection
        .scale((newWidth / 960) * 1500)
        .translate([newWidth * 0.3, newHeight * 0.88])

      svg.attr("width", newWidth).attr("height", newHeight)

      mainGroup.selectAll("path").attr("d", (d) => mainPath(d as d3.GeoPermissibleObjects) || "")
      alaskaGroup.selectAll("path").attr("d", (d) => alaskaPath(d as d3.GeoPermissibleObjects) || "")
      hawaiiGroup.selectAll("path").attr("d", (d) => hawaiiPath(d as d3.GeoPermissibleObjects) || "")
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [topology, stateData, topoJsonLoaded])

  const sortedStates = Array.from(stateData.values()).sort((a, b) => b.value - a.value)

  return (
    <div className="flex h-screen bg-white">
      {/* Map Section */}
      <div className="flex-1 flex flex-col p-8">
        <div className="mb-6">
          <h1 className="text-base font-normal text-black">Session by United States</h1>
        </div>

        <div ref={containerRef} className="flex-1 relative">
          <svg ref={svgRef} className="w-full h-full" />
          {tooltipState.visible && (
            <div
              className="absolute bg-black text-white px-4 py-2 rounded text-sm font-semibold pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${tooltipState.x}px`,
                top: `${tooltipState.y}px`,
              }}
            >
              {tooltipState.text}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white p-6 flex flex-col overflow-y-auto border-l border-gray-100">
        <div className="flex items-center gap-2 mb-6 pb-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-base font-normal text-black">United States</span>
        </div>

        <div className="space-y-3">
          {sortedStates.map((state) => (
            <div
              key={state.code}
              className="cursor-pointer transition-colors"
              onMouseEnter={() => setSelectedState(state)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-normal text-gray-900">
                  {state.code} <span className="text-gray-500">{">"}</span>
                </span>
                <span className="text-sm font-semibold text-gray-900">{state.value}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(state.value / Math.max(...sortedStates.map((s) => s.value))) * 100}%`,
                    backgroundColor: "#76C2F9",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Color Scale</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Low</span>
              <span className="text-xs text-gray-600">High</span>
            </div>
            <div
              className="h-3 rounded"
              style={{
                background: "linear-gradient(to right, #f0f0f0, #76C2F9)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}