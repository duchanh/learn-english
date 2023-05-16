import clsx from 'clsx'
import useInfiniteScroll from 'react-infinite-scroll-hook'

type Fn = () => any
interface ILoadMoreComponent {
	loading: boolean
	hasMore: boolean
	children: React.ReactNode
	loader: React.ReactNode
	className?: string
	rootMargin?: string
	delayInMs?: number
	onLoadMore: Fn
}

const LoadMoreComponent = ({
	loading,
	hasMore,
	className,
	children,
	loader,
	rootMargin,
	delayInMs = 250,
	onLoadMore,
}: ILoadMoreComponent) => {
	const [sentryRef] = useInfiniteScroll({
		loading: loading,
		hasNextPage: hasMore,
		rootMargin: rootMargin,
		delayInMs: delayInMs,
		onLoadMore: onLoadMore,
	})

	return (
		<div className={clsx('load-more-component', className)}>
			{children}
			{(loading || hasMore) && <div ref={sentryRef}>{loader}</div>}
		</div>
	)
}
export default LoadMoreComponent
