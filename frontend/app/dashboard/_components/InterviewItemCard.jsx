import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interviewItemData}) {
    const router=useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interviewItemData?.mockId);
    }

    const onFeedback=()=>{
        router.push('/dashboard/interview/'+interviewItemData?.mockId+'/feedback')
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interviewItemData?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interviewItemData?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At :{interviewItemData?.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button 
            onClick={onFeedback}
            size='sm' variant='outline' className='w-full'>Feedback</Button>
            <Button 
            onClick={onStart}
            size='sm' className='w-full'>Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard