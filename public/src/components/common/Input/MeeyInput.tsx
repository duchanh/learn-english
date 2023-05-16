import clsx from 'clsx';

interface MeeyInputProps {
  onPaste?: (event) => void
  onChange?: (event) => void
  value?: string
  valid?: boolean
}

const MeeyInput = (props: MeeyInputProps) => {
  const { onPaste, onChange, value, valid } = props;
  return (
    <div>
      <div className="flex items-center relative bg-light-gray border border-solid border-transparent rounded-lg focus-within:border-primary-400 p-2.5 mt-2 transition-all duration-300">
        <span className='inline-block ms ms-link text-fs-24 text-primary-400 left-2 absolute'></span>
        <input
          className={clsx('ml-7 border-none block w-full p-0 rounded-none outline-none bg-transparent placeholder-grey-400 text-sm', valid ? 'text-primary-400' : 'text-grey-400')}
          placeholder="Gắn link chia sẻ bài viết"
          onPaste={onPaste}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          value={value}
        />
      </div>
    </div>
  )
}

export default MeeyInput