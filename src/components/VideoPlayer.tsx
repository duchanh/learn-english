import ReactPlayer from 'react-player/lazy'
const VideoPlayer = () => {
  return (
    <div >
      <ReactPlayer width="100%" height="100%" playing controls url='https://course3.alexdsing.com/24day/video/intro_2/playlist.m3u8?v=5' />
    </div>
  )
}

export default VideoPlayer
