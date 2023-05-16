import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { PopOverProps } from 'Models'

const PopOverHoverTrigger = ({
	className,
	children,
	content,
	dropdownClassName,
	position = 'bottom-left',
	open,
	onOpen,
	onClose,
}: PopOverProps) => {
	const [isOpen, setIsOpen] = useState(open)

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	return (
		<div
			className={clsx('meey-popover', className)}
			onMouseOver={() => {
				setIsOpen(true)
				onOpen && onOpen()
			}}
			onMouseOut={() => {
				setIsOpen(false)
				onClose && onClose()
			}}
		>
			<div className="popover-trigger" onClick={onOpen}>
				{children}
			</div>
			{/* <CSSTransition
					in={open}
					nodeRef={nodeRef}
					timeout={200}
					unmountOnExit
					onEnter={() => {}}
					onExited={() => {}}
				> */}
			{isOpen ? (
				<div
					className={clsx(
						'popover-overlay',
						isOpen ? 'popover-overlay-open' : '',
						`popover-overlay-${position}`,
						dropdownClassName
					)}
				>
					{content}
				</div>
			) : null}
			{/* </CSSTransition> */}
		</div>
	)
}

export default PopOverHoverTrigger
