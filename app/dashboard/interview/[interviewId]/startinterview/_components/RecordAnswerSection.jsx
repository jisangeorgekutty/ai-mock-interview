"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { chatSession } from '@/utils/GeminiAI';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { toast } from 'sonner';


function RecordAnswerSection({ mockInterviewQuestion, activeIndexQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results?.map((result) => (
      setUserAnswer(result?.transcript)
    ))
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer?.length>10) {
      UpdateUserAnswer();
    }
  }, [userAnswer])


  const StartStopRecording = async() => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = "Question:" + mockInterviewQuestion[activeIndexQuestion]?.question +
      ",User Answer:" + userAnswer + ", Depends on question and user answer for given interview question" +
      " please give us rating for answer and feedback as area if improvement if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    const jsonFeedbackResp = JSON.parse(mockJsonResp);
    console.log("respose" + mockJsonResp);
    const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeIndexQuestion]?.question,
        correctAns: mockInterviewQuestion[activeIndexQuestion]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      })

    if (resp) {
      toast("User Answer Success");
      setUserAnswer('');
      setResults([]);
    }
    setResults([])
    setLoading(false);
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center bg-black items-center p-5 rounded-lg'>
        <Image src={"/webcam.png"} height={200} width={200} alt='webcam' className='absolute' />
        <Webcam
          mirrored="true"
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
            borderRadius: 10
          }} />
      </div>
      <Button
        disabled={loading}
        variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ?
          <h2 className='text-red-600 flex gap2'>
            <Mic />Stop Recording...
          </h2>
          :
          'Record Answer'
        }</Button>
        <Button onClick={()=>console.log(userAnswer)}>Show</Button>
    </div>
  )
}

export default RecordAnswerSection