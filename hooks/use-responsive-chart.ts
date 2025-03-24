"use client"

import { useEffect, useState } from "react"

type ChartConfig = {
  showLegend: boolean
  legendPosition?: "top" | "right" | "bottom" | "left"
  showTooltip: boolean
  showGrid: boolean
  barSize?: number
  fontSize: number
  labelFormatter?: (value: any) => string
  simplifyData?: boolean
  maxItems?: number
}

export function useResponsiveChart(): ChartConfig {
  const [config, setConfig] = useState<ChartConfig>({
    showLegend: true,
    legendPosition: "bottom",
    showTooltip: true,
    showGrid: true,
    barSize: 20,
    fontSize: 12,
    simplifyData: false,
    maxItems: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 480) {
        // Extra small devices
        setConfig({
          showLegend: false,
          showTooltip: true,
          showGrid: false,
          barSize: 15,
          fontSize: 10,
          simplifyData: true,
          maxItems: 5,
          labelFormatter: (value) => {
            if (typeof value === "string" && value.length > 10) {
              return value.substring(0, 10) + "..."
            }
            return value
          },
        })
      } else if (width < 768) {
        // Small devices
        setConfig({
          showLegend: true,
          legendPosition: "bottom",
          showTooltip: true,
          showGrid: false,
          barSize: 18,
          fontSize: 11,
          simplifyData: false,
          maxItems: 7,
          labelFormatter: (value) => {
            if (typeof value === "string" && value.length > 15) {
              return value.substring(0, 15) + "..."
            }
            return value
          },
        })
      } else if (width < 992) {
        // Medium devices
        setConfig({
          showLegend: true,
          legendPosition: "bottom",
          showTooltip: true,
          showGrid: true,
          barSize: 20,
          fontSize: 12,
          simplifyData: false,
          maxItems: undefined,
        })
      } else {
        // Large devices
        setConfig({
          showLegend: true,
          legendPosition: "right",
          showTooltip: true,
          showGrid: true,
          barSize: 20,
          fontSize: 12,
          simplifyData: false,
          maxItems: undefined,
        })
      }
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return config
}

