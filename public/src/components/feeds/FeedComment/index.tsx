import ListComment from './Listing/ListComment'
import { CommentContextProvider } from '@/context/comment.context'
import { HeaderListComment } from './Listing/HeaderListComment'
import { COMMENT_HTML_ID } from '@/constants/key'

const FeedComment = () => {
  return (
    <section className='mt-4' id={COMMENT_HTML_ID}>
      <CommentContextProvider>
        <HeaderListComment />
        <ListComment />
      </CommentContextProvider>
    </section>
  )
}

export default FeedComment
