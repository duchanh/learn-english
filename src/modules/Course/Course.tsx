import { Layout, Space, Collapse } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Panel } = Collapse;
interface CourseProps {
  course: any
}
const { Header, Footer, Sider, Content } = Layout;
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false })

const Course = (props: CourseProps) => {
  const { course } = props
  const router = useRouter()
  // const {lecture, group } = router.query
  const group: any = router.query.group
  const lecture: any = router.query.lecture
  const lectureGroup = course.lecture[group]
  const lectureItem = lectureGroup.find(item => item.index == lecture)
  const videoUrl = lectureItem.url
  return (
    <div className='flex w-full h-full'>
      <aside className='flex-[0_0_300px]'>
        <Collapse defaultActiveKey={['1']} >
          {course.lectureGroup.map(group => (
            <Panel header={group.title} key={`group-${group.id}`}>
              {course.lecture[group.id].map(lecture => (
                <Link href={`/course?lecture=${lecture.index}&group=${group.id}`}>
                  <div className='border-b cursor-pointer'>
                    {lecture.title}
                  </div>
                </Link>
              ))}
            </Panel>

          ))}

        </Collapse>

      </aside>
      <main className='flex-auto'>
        <VideoPlayer videoUrl={videoUrl} />
      </main>
    </div>
  )
}

export default Course