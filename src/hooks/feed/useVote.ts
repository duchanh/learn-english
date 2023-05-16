import useFeedStore from '@/store/feed-store'
import downVoteFeed from '@/api/endpoint/vote/down-vote'
import unVoteFeed from '@/api/endpoint/vote/un-vote'
import upVoteFeed from '@/api/endpoint/vote/up-vote'
import { AuthContext } from '@/context/auth.context'
import { useContext, useState } from 'react'
import { VoteActionEnum, VoteTypeEnum } from '@/constants/enum/vote.enum'
import { InteractionFeed } from 'Models'
import toast from 'react-hot-toast'
import FingerprintId from '@/utils/browserFingerprint'
import { updateInteraction } from '@/extensions/feed'

export const useVote = () => {
  const { isLoggedIn, token, login } = useContext(AuthContext)

  const [isSubmitted, setSubmitted] = useState(false)

  const { interactionFeeds, reloadInteractionFeed } = useFeedStore()

  const initInteraction = (feedId: string, currentInteraction?: InteractionFeed) => {
    return {
      feed: currentInteraction?.feed || feedId,
      totalComments: currentInteraction?.totalComments || 0,
      totalVotes: currentInteraction?.totalVotes || 0,
      upVoteCount: currentInteraction?.upVoteCount || 0,
      voteType: currentInteraction?.voteType || VoteTypeEnum.NOT_VOTE
    } as InteractionFeed
  }

  const onVoteAction = async ({
    feed,
    action,
    isVoted
  }: {
    feed: any
    action: VoteActionEnum
    isVoted: boolean
  }) => {
    let result = null

    const isServer = typeof window === 'undefined'

    const fingerprint = isServer ? undefined : FingerprintId()

    if (isLoggedIn) {
      if (!isSubmitted) {
        setSubmitted(true)
        const currentInteraction = interactionFeeds?.find((i) => i.feed === feed?._id)
        const initCurrentInteraction = initInteraction(feed?._id, currentInteraction)
        reloadInteractionFeed(
          updateInteraction({ action: action, interaction: initCurrentInteraction })
        )
        if (isVoted) {
          result = await unVoteFeed({ feedId: feed?._id, fingerprint, token })
        } else {
          switch (action) {
            case VoteActionEnum.UP_VOTE: {
              result = await upVoteFeed({ feedId: feed?._id, fingerprint, token })
              break
            }
            case VoteActionEnum.DOWN_VOTE: {
              result = await downVoteFeed({ feedId: feed?._id, fingerprint, token })
              break
            }
            default: {
              break
            }
          }
        }
        if (result) {
          reloadInteractionFeed(result)
        } else {
          toast.error(`Đã có lỗi xảy ra! Vui lòng thử lại!`)
        }
        setSubmitted(false)
      }
    } else {
      login()
    }
  }

  return { isSubmitted, onVoteAction }
}

export const useVoteFeed = (feed: any) => {
  /* Getting the isLoggedIn and token from the AuthContext. */
  const isUpVote = useFeedStore((state) => {
    return !!(state.interactionFeeds ?? []).find(
      (feedStore: InteractionFeed) =>
        feed?._id === feedStore.feed && feedStore.voteType === VoteTypeEnum.UP_VOTE
    )
  })

  const isDownVote = useFeedStore((state) => {
    return !!(state.interactionFeeds ?? []).find(
      (feedStore: InteractionFeed) =>
        feed?._id === feedStore.feed && feedStore.voteType === VoteTypeEnum.DOWN_VOTE
    )
  })

  const { isSubmitted, onVoteAction } = useVote()

  const onUpVoteFeed = async () => {
    onVoteAction({ feed, action: VoteActionEnum.UP_VOTE, isVoted: isUpVote })
  }

  const onDownVoteFeed = async () => {
    onVoteAction({ feed, action: VoteActionEnum.DOWN_VOTE, isVoted: isDownVote })
  }

  return {
    isSubmitted,
    onUpVoteFeed,
    onDownVoteFeed
  }
}
