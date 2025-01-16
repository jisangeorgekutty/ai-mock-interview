'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

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
        // console.log(jsonMockResp)
        console.log("data" + mockInterviewQuestion)
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
                />
            </div>
        </div>
    )
}

export default StartInterview