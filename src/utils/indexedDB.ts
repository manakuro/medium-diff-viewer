import { InitDB } from 'src/hooks/useIndexedDB'

export type ObjectStoreMeta = {
  store: string
  storeConfig: { keyPath: string; autoIncrement: boolean; [key: string]: any }
  storeSchema: ObjectStoreSchema[]
}

export enum DBMode {
  readonly = 'readonly',
  readwrite = 'readwrite',
}

export type ObjectStoreSchema = {
  name: string
  keypath: string
  options: { unique: boolean; [key: string]: any }
}

export type Key =
  | string
  | number
  | Date
  | ArrayBufferView
  | ArrayBuffer
  | IDBArrayKey
  | IDBKeyRange

export type Options = {
  storeName: string
  dbMode: IDBTransactionMode
  error: (e: Event) => any
  complete: (e: Event) => any
  abort?: any
}

export const validateStoreName = (db: IDBDatabase, storeName: string) => {
  return db.objectStoreNames.contains(storeName)
}

export const validateBeforeTransaction = (
  db: IDBDatabase,
  storeName: string,
  reject: Function,
) => {
  if (!db) {
    reject(
      'You need to use the openDatabase function to create a database before you query it!',
    )
  }
  if (!validateStoreName(db, storeName)) {
    reject(`objectStore does not exists: ${storeName}`)
  }
}

export const createTransaction = (
  db: IDBDatabase,
  options: Options,
): IDBTransaction => {
  let trans: IDBTransaction = db.transaction(options.storeName, options.dbMode)
  trans.onerror = options.error
  trans.oncomplete = options.complete
  trans.onabort = options.abort
  return trans
}

export const optionsGenerator = (
  type: any,
  storeName: any,
  reject: Function,
  resolve: Function,
): Options => {
  return {
    storeName: storeName,
    dbMode: type,
    error: (e: Event) => {
      reject(e)
    },
    complete: (_: Event) => {
      resolve()
    },
    abort: (e: Event) => {
      reject(e)
    },
  }
}

export const CreateObjectStore = (
  dbName: string,
  version: number,
  storeSchemas: ObjectStoreMeta[],
) => {
  const request: IDBOpenDBRequest = indexedDB.open(dbName, version)

  request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
    const database: IDBDatabase = (event.target as any).result
    storeSchemas.forEach((storeSchema: ObjectStoreMeta) => {
      if (!database.objectStoreNames.contains(storeSchema.store)) {
        const objectStore = database.createObjectStore(
          storeSchema.store,
          storeSchema.storeConfig,
        )
        storeSchema.storeSchema.forEach((schema: ObjectStoreSchema) => {
          objectStore.createIndex(schema.name, schema.keypath, schema.options)
        })
      }
    })
    database.close()
  }
  request.onsuccess = function(e: any) {
    e.target.result.close()
  }
}

const indexedDB: IDBFactory =
  window.indexedDB ||
  (<any>window).mozIndexedDB ||
  (<any>window).webkitIndexedDB ||
  (<any>window).msIndexedDB

export const openDatabase = (
  dbName: string,
  version: number,
  upgradeCallback?: Function,
) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, version)
    let db: IDBDatabase
    request.onsuccess = (event: Event) => {
      db = request.result
      resolve(db)
    }
    request.onerror = (event: Event) => {
      reject(`IndexedDB error: ${request.error}`)
    }
    if (typeof upgradeCallback === 'function') {
      request.onupgradeneeded = (event: Event) => {
        console.log('checkout')
        upgradeCallback(event, db)
      }
    }
  })
}

export let indexeddbConfiguration: {
  version: number | null
  name: string | null
} = {
  version: null,
  name: null,
}

export const initDB = ({ name, version, objectStoresMeta }: InitDB) => {
  indexeddbConfiguration.name = name
  indexeddbConfiguration.version = version
  Object.freeze(indexeddbConfiguration)
  CreateObjectStore(name, version, objectStoresMeta)
}
