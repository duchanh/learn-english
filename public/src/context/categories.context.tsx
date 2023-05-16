import {createContext} from 'react'
import { Category } from 'Models'
interface ICategoryContext {
  categories?: Category[]
}

interface CategoryContextProviderProps extends ICategoryContext {
  children: React.ReactNode
}
export const CategoryContext = createContext<ICategoryContext>({
  categories: []
})

export function CategoryContextProvider(
  props: CategoryContextProviderProps
) : JSX.Element {
  const {children, ...value} = props
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}