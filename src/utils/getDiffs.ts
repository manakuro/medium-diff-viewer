import { LOCAL_STORAGE_KEY } from 'src/const'

const getDiffs = () => {
  const diffs = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
  return JSON.parse(diffs)
}

export default getDiffs
