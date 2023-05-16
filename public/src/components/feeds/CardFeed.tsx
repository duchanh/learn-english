interface CardFeedProps {
  children: React.ReactNode
  className?: string
}
const CardFeed = (props: CardFeedProps) => {
  const { children } = props
  return (
    <div className={`p-4 bg-light-blue md:bg-white md:rounded-lg mb-2 md:mb-5 md:shadow-[0px_0px_3px_rgba(0,0,0,0.1)]`}>
      {children}
    </div>
  )
}

export default CardFeed
