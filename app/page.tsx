// ./app/page.tsx

'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface Node {
  x: number
  y: number
  z: number
  id: number
}

const round = (num: number) => Number(num.toFixed(4))

export default function Home() {
  const [nodeCount, setNodeCount] = useState<number>(58)
  const [allocation, setAllocation] = useState<number>(10)
  
  // Increased canvas size
  const CANVAS_WIDTH = 1200
  const CANVAS_HEIGHT = 800
  const NODE_SIZE = 12
  const CENTER_X = CANVAS_WIDTH / 2
  const CENTER_Y = CANVAS_HEIGHT / 2
  
  const RESOURCES_PER_NODE = {
    cpu: 8,
    memory: 16,
    storage: 320
  }
  
  const totalResources = {
    cpu: (nodeCount * RESOURCES_PER_NODE.cpu * (allocation / 100)).toFixed(1),
    memory: (nodeCount * RESOURCES_PER_NODE.memory * (allocation / 100)).toFixed(1),
    storage: (nodeCount * RESOURCES_PER_NODE.storage * (allocation / 100)).toFixed(0)
  }

  const ringThickness = round(20 + (nodeCount * allocation / 100))

  const generateNodes = (
    count: number, 
    radius: number, 
    yOffset: number, 
    scale = 0.3
  ): Node[] => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI
      return {
        x: round(CENTER_X + radius * Math.cos(angle)),
        y: round(CENTER_Y + yOffset + (radius * Math.sin(angle) * scale)),
        z: round(radius * Math.sin(angle)),
        id: i
      }
    })
  }

  // Increased base radius for larger visualization
  const baseRadius = 300
  const xNodes = generateNodes(nodeCount, baseRadius, 50)  // Adjusted yOffset
  const vmNodes = generateNodes(Math.floor(nodeCount * 0.6), baseRadius * 0.75, -50)  // Adjusted yOffset

  return (
    <main className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-64 p-4 border-r bg-gray-50 dark:bg-gray-900">
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">XNode Count ({nodeCount} nodes)</Label>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
              Infrastructure Size
            </div>
            <Slider 
              value={[nodeCount]}
              onValueChange={([value]) => setNodeCount(value)}
              min={10}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Resource Allocation ({allocation}%)</Label>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
              Percentage of resources allocated to Openmesh Cloud
            </div>
            <Slider 
              value={[allocation]}
              onValueChange={([value]) => setAllocation(value)}
              min={1}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Total Resources Allocated</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div>{totalResources.cpu} vCPU</div>
              <div>{totalResources.memory} GB RAM</div>
              <div>{totalResources.storage} GB Storage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Made fullscreen */}
      <div className="flex-1 h-screen">
        <Card className="w-full h-full bg-white dark:bg-slate-900 rounded-none">
          <CardHeader>
            <CardTitle className="text-center text-3xl">The Openmesh Cloud Stack</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100vh-80px)]">
            <div className="w-full h-full flex items-center justify-center">
              <svg 
                width="100%" 
                height="100%" 
                className="max-h-full"
                viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="resourceGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="33%" stopColor="#22c55e" />
                    <stop offset="33%" stopColor="#eab308" />
                    <stop offset="66%" stopColor="#eab308" />
                    <stop offset="66%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* Connection lines */}
                {xNodes.map((xNode, i) => 
                  vmNodes.map((vm, j) => {
                    if ((i + j) % 3 === 0) {
                      const opacity = round((xNode.z + vm.z) / (baseRadius * 4) + 0.1)
                      return (
                        <line
                          key={`connection-${i}-${j}`}
                          x1={round(xNode.x)}
                          y1={round(xNode.y)}
                          x2={round(vm.x)}
                          y2={round(vm.y)}
                          stroke="#3b82f6"
                          strokeWidth={0.5}
                          opacity={opacity}
                        />
                      )
                    }
                    return null
                  })
                )}

                {/* Resource ring - moved down and overlapping */}
                <circle
                  cx={CENTER_X}
                  cy={CENTER_Y + 20}  // Moved down to overlap
                  r={round(baseRadius * 0.75)}
                  fill="none"
                  strokeWidth={ringThickness}
                  stroke="url(#resourceGradient)"
                  transform={`scale(1, 0.3)`}
                  className="opacity-90"
                />

                {/* VM nodes */}
                {vmNodes.map((node) => (
                  <rect
                    key={`vm-${node.id}`}
                    x={round(node.x - NODE_SIZE/2)}
                    y={round(node.y - NODE_SIZE/2)}
                    width={NODE_SIZE}
                    height={NODE_SIZE}
                    className="fill-blue-400"
                    style={{
                      opacity: round((node.z + baseRadius) / (baseRadius * 2))
                    }}
                  />
                ))}

                {/* XNodes */}
                {xNodes.map((node) => (
                  <rect
                    key={`xnode-${node.id}`}
                    x={round(node.x - NODE_SIZE/2)}
                    y={round(node.y - NODE_SIZE/2)}
                    width={NODE_SIZE}
                    height={NODE_SIZE}
                    className="fill-blue-600"
                    style={{
                      opacity: round((node.z + baseRadius) / (baseRadius * 2))
                    }}
                  />
                ))}

                <g className="label-group">
                <line 
                    x1={CENTER_X + baseRadius * 0.85} 
                    y1={CENTER_Y - 50} 
                    x2={CENTER_X + baseRadius * 1.2} 
                    y2={CENTER_Y - 100}
                    stroke="#666666" 
                    strokeWidth={1}
                />
                <text 
                    x={CENTER_X + baseRadius * 1.2} 
                    y={CENTER_Y - 110} 
                    className="text-sm fill-gray-600"
                    textAnchor="start"
                >
                    Openmesh Cloud
                    <tspan x={CENTER_X + baseRadius * 1.2} y={CENTER_Y - 90} className="text-xs fill-gray-500">
                    {`${allocation}% Resources Allocated`}
                    </tspan>
                </text>
                </g>

                {/* VM Ring Label */}
                <g className="label-group">
                <line 
                    x1={CENTER_X - baseRadius * 0.75} 
                    y1={CENTER_Y} 
                    x2={CENTER_X - baseRadius * 1.1} 
                    y2={CENTER_Y - 20}
                    stroke="#666666" 
                    strokeWidth={1}
                />
                <text 
                    x={CENTER_X - baseRadius * 1.1} 
                    y={CENTER_Y - 30} 
                    className="text-sm fill-gray-600"
                    textAnchor="end"
                >
                    Virtual Machine Layer
                    <tspan x={CENTER_X - baseRadius * 1.1} y={CENTER_Y - 10} className="text-xs fill-gray-500">
                    {`${Math.floor(nodeCount * 0.6)} VMs`}
                    </tspan>
                </text>
                </g>

                {/* XNode Ring Label */}
                <g className="label-group">
                <line 
                    x1={CENTER_X + baseRadius} 
                    y1={CENTER_Y + 50} 
                    x2={CENTER_X + baseRadius * 1.2} 
                    y2={CENTER_Y + 80}
                    stroke="#666666" 
                    strokeWidth={1}
                />
                <text 
                    x={CENTER_X + baseRadius * 1.2} 
                    y={CENTER_Y + 70} 
                    className="text-sm fill-gray-600"
                    textAnchor="start"
                >
                    XNode Infrastructure
                    <tspan x={CENTER_X + baseRadius * 1.2} y={CENTER_Y + 90} className="text-xs fill-gray-500">
                    {`${nodeCount} Nodes (${totalResources.cpu} vCPU, ${totalResources.memory} GB RAM)`}
                    </tspan>
                </text>
                </g>


              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}