import { CommentStatusEnum } from '@/constants/enum/comment.enum'
import { VoteActionEnum, VoteTypeEnum } from '@/constants/enum/vote.enum'
import { CLIENT_ID } from '@/constants/environment'
import { isValidYoutubeUrl } from '@/utils/string'
import { ICommentItem, InteractionFeed, InteractionFeedStyle } from 'Models'
import { v4 as uuidv4 } from 'uuid'

export const getFeedVideoEmbed = (url: string) => {
  if (!url) return ''
  const isVideoYoutube = isValidYoutubeUrl(url)

  return isVideoYoutube ? url.replaceAll('watch?v=', 'embed/') : url
}

export const onLoadStyleInteractionFeed = (interactionFeed: InteractionFeed) => {
  if (!interactionFeed) return null
  return initStyleByVoteType(interactionFeed.voteType)
}

export const initStyleByVoteType = (voteType: VoteTypeEnum) => {
  let result: InteractionFeedStyle = {
    styleUpButton: '',
    styleDownButton: '',
    styleText: ''
  }
  if (!voteType) return null
  switch (voteType) {
    case VoteTypeEnum.UP_VOTE: {
      result.styleUpButton = '!text-primary-400'
      result.styleText = '!text-primary-400'
      break
    }
    case VoteTypeEnum.DOWN_VOTE: {
      result.styleDownButton = '!text-secondary-600'
      result.styleText = '!text-secondary-600'
      break
    }
    default: {
      break
    }
  }
  return result
}

export const updateInteraction = ({
  interaction,
  action
}: {
  interaction: InteractionFeed
  action: VoteActionEnum
}) => {
  if (action === VoteActionEnum.UP_VOTE) {
    switch (interaction.voteType) {
      case VoteTypeEnum.UP_VOTE: {
        interaction.upVoteCount -= 1
        interaction.voteType = VoteTypeEnum.NOT_VOTE
        interaction.totalVotes -= 1
        break
      }
      case VoteTypeEnum.DOWN_VOTE: {
        interaction.upVoteCount += 2
        interaction.voteType = VoteTypeEnum.UP_VOTE
        break
      }
      case VoteTypeEnum.NOT_VOTE:
      default: {
        interaction.upVoteCount += 1
        interaction.voteType = VoteTypeEnum.UP_VOTE
        interaction.totalVotes += 1
        break
      }
    }
  }

  if (action === VoteActionEnum.DOWN_VOTE) {
    switch (interaction.voteType) {
      case VoteTypeEnum.UP_VOTE: {
        interaction.upVoteCount -= 2
        interaction.voteType = VoteTypeEnum.DOWN_VOTE
        break
      }
      case VoteTypeEnum.DOWN_VOTE: {
        interaction.upVoteCount += 1
        interaction.voteType = VoteTypeEnum.NOT_VOTE
        interaction.totalVotes -= 1
        break
      }
      case VoteTypeEnum.NOT_VOTE: {
        interaction.upVoteCount -= 1
        interaction.voteType = VoteTypeEnum.DOWN_VOTE
        interaction.totalVotes += 1
        break
      }
      default:
    }
  }

  return interaction
}

export const initNewComment = ({
  channel,
  message,
  user,
  replies
}: {
  channel: string
  message: string | number
  user?: any
  replies?: string
}) => {
  const idComment = uuidv4()
  return {
    channel: channel,
    content: message,
    _id: idComment,
    id: idComment,
    replies: replies,
    author: {
      _id: user?._id,
      meeyId: user?._id,
      meeyIdData: user
    },
    totalReplied: 0,
    totalVotes: 0,
    totalLiked: 0,
    totalDisliked: 0,
    source: CLIENT_ID,
    createBy: user?._id,
    status: CommentStatusEnum.PENDING,
    upVoteCount: 0,
    voteType: VoteTypeEnum.NOT_VOTE
  } as ICommentItem
}


export const initInteraction = (feedId: string, currentInteraction?: InteractionFeed) => {
  return {
    feed: currentInteraction?.feed || feedId,
    totalComments: currentInteraction?.totalComments || 0,
    totalVotes: currentInteraction?.totalVotes || 0,
    upVoteCount: currentInteraction?.upVoteCount || 0,
    voteType: currentInteraction?.voteType || VoteTypeEnum.NOT_VOTE
  } as InteractionFeed
}