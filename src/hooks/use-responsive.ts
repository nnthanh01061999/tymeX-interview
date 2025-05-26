import { HydrationContext } from "@/components/contexts/HydrationContext"
import { useContext, useEffect, useState } from "react"

function getInitialDeviceType(userAgent: string) {
  const isMobile =
    /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  const isTablet = /iPad/i.test(userAgent)
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isClient: false
  }
}

function getDeviceType() {
  const { innerWidth } = window
  const isMobile = innerWidth <= 768
  const isTablet = innerWidth <= 768
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isClient: true
  }
}

export const useResponsive = () => {
  const { userAgent } = useContext(HydrationContext)
  const [deviceType, setDeviceType] = useState(getInitialDeviceType(userAgent))

  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType())
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return deviceType
}
