import ReactPlayer from 'react-player/lazy'
interface VideoPlayerProps {
  videoUrl: string
}
const VideoPlayer = (props: VideoPlayerProps) => {
  const {videoUrl} = props
  return (
    <div >
      <ReactPlayer width="100%" height="100%" playing controls url={videoUrl} />
    </div>
  )
}

export default VideoPlayer
