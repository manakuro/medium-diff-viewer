import {
  ObjectStoreMeta,
  CreateObjectStore,
  Key,
  DBOperations,
} from 'src/utils/indexedDB'

export type InitDB = {
  name: string
  version: number
  objectStoresMeta: ObjectStoreMeta[]
}

export type UseIndexedDB = {
  add: <T = any>(value: T, key?: any) => Promise<number>
  getByID: <T = any>(id: number | string) => Promise<T>
  getAll: <T = any>() => Promise<T[]>
  update: <T = any>(value: T, key?: any) => Promise<any>
  deleteRecord: (key: Key) => Promise<any>
  openCursor: (
    cursorCallback: (event: Event) => void,
    keyRange?: IDBKeyRange,
  ) => Promise<void>
  getByIndex: (indexName: string, key: any) => Promise<any>
  getAllByIndex: (indexName: string, key: any) => Promise<any>
}

let indexeddbConfiguration: { version: number | null; name: string | null } = {
  version: null,
  name: null,
}

export const initDB = ({ name, version, objectStoresMeta }: InitDB) => {
  indexeddbConfiguration.name = name
  indexeddbConfiguration.version = version
  Object.freeze(indexeddbConfiguration)
  CreateObjectStore(name, version, objectStoresMeta)
}

export const useIndexedDB = (objectStore: string): UseIndexedDB => {
  if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
    throw new Error('Please, initialize the DB before the use.')
  }
  return {
    ...DBOperations(
      indexeddbConfiguration.name,
      indexeddbConfiguration.version,
      objectStore,
    ),
  }
}
