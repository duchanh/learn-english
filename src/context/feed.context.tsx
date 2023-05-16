import { Feed, InteractionFeed } from 'Models'
import { createContext } from 'react'

interface IFeedContext {
  feed?: Feed
  interactionFeed?: InteractionFeed
  comments?: any
}

interface FeedContextProviderProps extends IFeedContext {
  children: React.ReactNode
}

export const FeedContext = createContext<IFeedContext>({
  feed: null,
  interactionFeed: null,
  comments: {}
})

export function FeedContextProvider(props: FeedContextProviderProps): JSX.Element {
  const { children, ...rest } = props
  return <FeedContext.Provider value={rest}>{props.children}</FeedContext.Provider>
}
