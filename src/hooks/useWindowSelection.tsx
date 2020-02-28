import { useEffect, useState } from 'react'

const getWindowSelectionText = () => {
  const selection = window.getSelection()
  return selection ? selection.toString() : ''
}

const useWindowSelection = () => {
  const [windowSelectionText, setWindowSelectionText] = useState(
    getWindowSelectionText(),
  )

  useEffect(() => {
    const handleSelectionChange = () => {
      setWindowSelectionText(getWindowSelectionText())
    }

    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  return windowSelectionText
}

export default useWindowSelection
