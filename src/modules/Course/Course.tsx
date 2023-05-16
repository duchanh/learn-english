import { Layout, Space, Collapse } from 'antd';

const { Panel } = Collapse;
interface CourseProps {
  course: any
}
const { Header, Footer, Sider, Content } = Layout;
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false })
const Course = (props: CourseProps) => {
  const { course } = props
  console.log('course', course)
  return (
    <div className='flex w-full h-full'>
      <aside className='flex-[0_0_300px]'>
        <Collapse defaultActiveKey={['1']} >
          {course.lectureGroup.map(group => (
            <Panel header={group.title} key={`group-${group.id}`}>
              {course.lecture[group.id].map(lecture => (
                <div className='border-b'>
                  {lecture.title}
                </div>
              ))}
            </Panel>

          ))}

        </Collapse>

      </aside>
      <main className='flex-auto'>
        <VideoPlayer />
      </main>
    </div>
  )
}

export default Course