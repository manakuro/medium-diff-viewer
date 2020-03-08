import {
  ObjectStoreMeta,
  CreateObjectStore,
  Key,
  openDatabase,
  createTransaction,
  optionsGenerator,
  DBMode,
  validateBeforeTransaction,
} from 'src/utils/indexedDB'
import { useCallback } from 'react'

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
  clear: () => Promise<any>
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

export const useIndexedDB = (currentStore: string): UseIndexedDB => {
  if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
    throw new Error('Please, initialize the DB before the use.')
  }
  const { name, version } = indexeddbConfiguration

  const add = useCallback(
    <T>(value: T, key?: any) => {
      return new Promise<number>((resolve, reject) => {
        openDatabase(name, version).then((db: IDBDatabase) => {
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readwrite, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore)
          let request = objectStore.add(value, key)
          request.onsuccess = (evt: any) => {
            key = evt.target.result
            resolve(key)
          }
        })
      })
    },
    [currentStore, name, version],
  )

  const getAllByIndex = useCallback(
    (indexName: string, key: any) => {
      return new Promise<any>((resolve, reject) => {
        openDatabase(name, version).then(db => {
          validateBeforeTransaction(db, currentStore, reject)
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readonly, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore),
            index = objectStore.index(indexName),
            request = index.getAll(key)
          request.onsuccess = (event: Event) => {
            resolve((<IDBOpenDBRequest>event.target).result)
          }
        })
      })
    },
    [currentStore, name, version],
  )

  const getByID = useCallback(
    <T>(id: string | number) => {
      return new Promise<T>((resolve, reject) => {
        openDatabase(name, version).then((db: IDBDatabase) => {
          validateBeforeTransaction(db, currentStore, reject)
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readonly, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore),
            request: IDBRequest
          request = objectStore.get(+id)
          request.onsuccess = function(event: Event) {
            resolve((event.target as any).result as T)
          }
        })
      })
    },
    [currentStore, name, version],
  )

  const getAll = useCallback(<T>() => {
    return new Promise<T[]>((resolve, reject) => {
      openDatabase(name, version).then(db => {
        validateBeforeTransaction(db, currentStore, reject)
        let transaction = createTransaction(
            db,
            optionsGenerator(DBMode.readonly, currentStore, reject, resolve),
          ),
          objectStore = transaction.objectStore(currentStore)

        const request: IDBRequest = objectStore.getAll()

        request.onerror = function(e) {
          reject(e)
        }

        request.onsuccess = function({ target: { result } }: any) {
          resolve(result as T[])
        }
      })
    })
  }, [currentStore, name, version])

  const update = useCallback(
    <T>(value: T, key?: any) => {
      return new Promise<any>((resolve, reject) => {
        openDatabase(name, version).then(db => {
          validateBeforeTransaction(db, currentStore, reject)
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readwrite, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore)
          transaction.oncomplete = event => {
            resolve(event)
          }
          objectStore.put(value, key)
        })
      })
    },
    [currentStore, name, version],
  )

  const deleteRecord = useCallback(
    (key: Key) => {
      return new Promise<any>((resolve, reject) => {
        openDatabase(name, version).then(db => {
          validateBeforeTransaction(db, currentStore, reject)
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readwrite, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore)
          let request = objectStore.delete(key)
          request.onsuccess = event => {
            resolve(event)
          }
        })
      })
    },
    [currentStore, name, version],
  )

  const clear = useCallback(() => {
    return new Promise<any>((resolve, reject) => {
      openDatabase(name, version).then(db => {
        validateBeforeTransaction(db, currentStore, reject)
        let transaction = createTransaction(
            db,
            optionsGenerator(DBMode.readwrite, currentStore, reject, resolve),
          ),
          objectStore = transaction.objectStore(currentStore)
        objectStore.clear()
        transaction.oncomplete = event => {
          resolve()
        }
      })
    })
  }, [currentStore, name, version])

  const openCursor = useCallback(
    (cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange) => {
      return new Promise<void>((resolve, reject) => {
        openDatabase(name, version).then(db => {
          validateBeforeTransaction(db, currentStore, reject)
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readonly, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore),
            request = objectStore.openCursor(keyRange)

          request.onsuccess = (event: Event) => {
            cursorCallback(event)
            resolve()
          }
        })
      })
    },
    [currentStore, name, version],
  )

  const getByIndex = useCallback(
    (indexName: string, key: any) => {
      return new Promise<any>((resolve, reject) => {
        openDatabase(name, version).then(db => {
          validateBeforeTransaction(db, currentStore, reject)
          let transaction = createTransaction(
              db,
              optionsGenerator(DBMode.readonly, currentStore, reject, resolve),
            ),
            objectStore = transaction.objectStore(currentStore),
            index = objectStore.index(indexName),
            request = index.get(key)
          request.onsuccess = (event: Event) => {
            resolve((<IDBOpenDBRequest>event.target).result)
          }
        })
      })
    },
    [currentStore, name, version],
  )

  return {
    getByID,
    getAll,
    update,
    add,
    deleteRecord,
    clear,
    openCursor,
    getByIndex,
    getAllByIndex,
  }
}
