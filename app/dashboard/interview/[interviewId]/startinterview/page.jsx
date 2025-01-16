'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const { interviewId } = React.use(params);
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeIndexQuestion, setActiveIndexQuestion] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));
        console.log(result);
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
        console.log("DATA" + result[0])
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* question section */}
                <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
                    activeIndexQuestion={activeIndexQuestion}
                />
                {/* answer record section */}
                <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion}
                    activeIndexQuestion={activeIndexQuestion}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
            {activeIndexQuestion>0&&
            <Button onClick={()=>setActiveIndexQuestion(activeIndexQuestion-1)}>Previous Question</Button>}
            {activeIndexQuestion!=mockInterviewQuestion?.length-1&&
            <Button onClick={()=>setActiveIndexQuestion(activeIndexQuestion+1)}>Next Question</Button>}
            {activeIndexQuestion==mockInterviewQuestion?.length-1&& 
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button >End Interview</Button>
            </Link>}
            </div>
        </div>
    )
}

export default StartInterview