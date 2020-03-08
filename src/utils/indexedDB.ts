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

export const DBOperations = (
  dbName: string,
  version: number,
  currentStore: string,
) => {
  return {
    add<T>(value: T, key?: any) {
      return new Promise<number>((resolve, reject) => {
        openDatabase(dbName, version).then((db: IDBDatabase) => {
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
    getByID<T>(id: string | number) {
      return new Promise<T>((resolve, reject) => {
        openDatabase(dbName, version).then((db: IDBDatabase) => {
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
    getAll<T>() {
      return new Promise<T[]>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
    },
    update<T>(value: T, key?: any) {
      return new Promise<any>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
    deleteRecord(key: Key) {
      return new Promise<any>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
    clear() {
      return new Promise<any>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
    },
    openCursor(cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange) {
      return new Promise<void>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
    getByIndex(indexName: string, key: any) {
      return new Promise<any>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
    getAllByIndex(indexName: string, key: any) {
      return new Promise<any>((resolve, reject) => {
        openDatabase(dbName, version).then(db => {
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
  }
}
