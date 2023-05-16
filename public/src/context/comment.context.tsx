import { useListCommentByFeed } from '@/hooks/comment/useComment'
import { ICommentItem } from 'Models'
import { createContext, useContext } from 'react'
import { FeedContext } from './feed.context'

interface ICommentContext {
  channel?: string
  comments?: Array<ICommentItem>
  totalComments?: number
  hasMore?: boolean
  isValidating?: boolean
  onLoadMore?: () => void
  onSendComment?: (value: string | number) => void
}

interface CommentContextProviderProps extends ICommentContext {
  children: React.ReactNode
}
export const CommentContext = createContext<ICommentContext>({
  channel: null,
  comments: [],
  totalComments: 0
})

export function CommentContextProvider(props: CommentContextProviderProps): JSX.Element {
  const { children } = props

  const { feed } = useContext(FeedContext)

  const listComments = useListCommentByFeed(feed)

  return <CommentContext.Provider value={listComments}>{children}</CommentContext.Provider>
}
