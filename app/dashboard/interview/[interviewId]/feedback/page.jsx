"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function Feedback({ params }) {
    const { interviewId } = React.use(params);
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();
    // whenever this component load the useEffet will exicute
    useEffect(() => {
        getFeedback();
    }, [])
    const getFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interviewId))
            .orderBy(UserAnswer.id);
        setFeedbackList(result);
        console.log(result);

    }

   

    const homePage = () => {
        router.push('/dashboard')
    }

    return (
        <div className='p-10'>
            {feedbackList?.length == 0 ?
                <>
                    <h2 className='font-bold text-xl text-gray-400 border rounded-lg p-4'>No Interview Feedback Is Founded</h2>
                    <Button onClick={homePage} className='mt-5 float-right'>Go Home</Button>
                </>
                :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations!!!</h2>
                    <h2 className='font-bold text-2xl'>Here Is Your Interview Result</h2>
                    <h2 className='text-primary text-lg my-3'>Your overall rating :<strong>{7/10}</strong> </h2>
                    <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,Your answer and feedback for improvement</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 
            text-left flex justify-between gap-7 w-full'>
                                {item.question}<ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating :</strong>{item.rating}</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer :</strong>{item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer :</strong>{item.correctAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback :</strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                    <Button onClick={homePage}>Go Home</Button>
                </>}

        </div>
    )
}

export default Feedback