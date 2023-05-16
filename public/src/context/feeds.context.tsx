import { createContext } from "react"

interface IFeedsContext {
  fallback: any
}

interface CategoryContextProviderProps extends IFeedsContext {
  children: React.ReactNode
}

export const FeedsContext = createContext<IFeedsContext>({
  fallback: {}
})

export function FeedsContextProvider(props: CategoryContextProviderProps) : JSX.Element {
  const {children, ...value} = props
  return (
    <FeedsContext.Provider value={value}>
      {children}
    </FeedsContext.Provider>
  )
}