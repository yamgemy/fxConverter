import { useState } from "react"

export const useSampleHook = () => {
  const [sample, setSample] = useState(false)

  return {
    sample,
    setSample,
  }
}
