import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { createUserStore } from './userStore'
import { createAdminStore } from './adminStore'
import { createTemplateStore } from './templateStore'

const StoreContext = React.createContext(null)

export const useStore = (): any => {
  const store = React.useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export let adminStore

export function Provider({ children }: any): JSX.Element {
  adminStore = useLocalStore(createAdminStore)
  const userStore = useLocalStore(createUserStore)
  const templateStore = useLocalStore(createTemplateStore)

  const store: any = {
    userStore,
    adminStore,
    templateStore,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
