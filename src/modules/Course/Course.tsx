import { Collapse, Button, Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo'
import clsx from 'clsx';

const { Panel } = Collapse;
interface CourseProps {
  course: any
}
import dynamic from 'next/dynamic'
import { useState } from 'react';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false })

const Course = (props: any) => {
  const [showAnswer, setShowAnser] = useState(false)
  const { course } = props
  const router = useRouter()
  const groupId: any = router.query.group
  const lectureId: any = router.query.lecture

  const currentGroup = course.lecture[groupId]
  const currentLecture = currentGroup?.find(item => item.index == lectureId)
  const videoUrl = currentLecture?.url

  return (
    <>
     
      <div className='flex w-full h-full'>
        <aside className='flex-[0_0_300px] sticky top-0 max-h-[100vh] overflow-auto'>
          <Collapse defaultActiveKey={[groupId]} accordion>
            {course.lectureGroup.map(group => (
              <Panel header={group.title} key={group.id}>
                {course.lecture[group.id].map(lecture => (
                  <Link href={`?lecture=${lecture.index}&group=${group.id}`} className={clsx('flex border-b border-grey-100 border-solid border-[1px] border-x-0 border-t-0 last:border-0', {
                    'bg-primary-100': lecture.index == lectureId
                  })} >
                    <div className='flex cursor-pointer px-4 py-2'>
                      <div className='flex items-center w-[50px] min-w-[50px] text-grey-400 '>
                        {lecture.time}
                      </div>
                      <div className='text-grey-800'>
                        {lecture.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </Panel>
            ))}
          </Collapse>

        </aside>
        <main className='flex-auto'>
          {currentLecture?.type === 'read' && (
            <div>
              <img src={currentLecture.img} className="w-full h-full" />


            </div>
          )}

          {currentLecture?.type === 'listen' && (
            <>
              {currentLecture.mp3 && (
                <>
                  <div className='flex justify-center'>
                    <audio controls>
                      <source src={currentLecture.mp3} type="audio/mpeg" />
                    </audio>
                  </div>
                  <div>
                    <img src={currentLecture.img} className="w-full" />
                  </div>
                </>
              )}
            </>
          )}

          {currentLecture?.url && (
            <VideoPlayer videoUrl={videoUrl} />
          )}

          {currentLecture?.answer && (
            <div className='my-8 flex items-center justify-center'>
              <Button onClick={() => setShowAnser(true)}>Xem đáp án</Button>
              <Modal title="Đáp án" open={showAnswer} onCancel={() => setShowAnser(false)} centered destroyOnClose footer={null} >
                <img src={currentLecture.answer} className="w-full h-auto object-cover" />
              </Modal>
            </div>
          )}


        </main>
      </div>
    </>
  )
}

export default Course