import { DB_NAME, DB_STORE_NAME } from 'src/const'

export default {
  name: DB_NAME,
  version: 1,
  objectStoresMeta: [
    {
      store: DB_STORE_NAME,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'mediumId', keypath: 'mediumId', options: { unique: false } },
        { name: 'content', keypath: 'content', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
      ],
    },
  ],
}
