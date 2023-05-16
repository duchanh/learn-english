import { PopOverProps } from 'Models'
import PopOverClickTrigger from './PopOverClickTrigger'
import PopOverHoverTrigger from './PopOverHoverTrigger'

const PopOver = (props: PopOverProps) => {
  const { trigger = 'click' } = props
  switch (trigger) {
    case 'click':
      return <PopOverClickTrigger {...props} />
    case 'hover':
      return <PopOverHoverTrigger {...props} />
    default:
      return <PopOverClickTrigger {...props} />
  }
}

export default PopOver
