import { useEffect } from 'react'
import debounce from 'lodash/debounce'
import { UseDiffs } from 'src/hooks/useDiffs'

type Props = {
  shouldUpdateDiff: UseDiffs['shouldUpdateDiff']
  addDiff: UseDiffs['addDiff']
}

let observer: MutationObserver
const useContentObserver = (props: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const monitored = document.querySelector('[contenteditable="true"]')
      if (!monitored) return

      observer = new MutationObserver(
        debounce(async () => {
          if (props.shouldUpdateDiff()) {
            await props.addDiff()
          }
        }, 2000),
      )
      observer.observe(monitored, {
        subtree: true,
        attributes: false,
        childList: true,
      })
    })
    return () => {
      if (observer) observer.disconnect()
      clearTimeout(timer)
    }
  }, [props])
}

export default useContentObserver
