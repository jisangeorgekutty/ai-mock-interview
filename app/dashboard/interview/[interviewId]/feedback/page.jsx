import React from 'react'

function Feedback({params}) {
    const getFeedback=()=>{

    }
  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!!!</h2>
        <h2 className='font-bold text-2xl'>Here Is Your Interview Result</h2>
        <h2 className='text-primary text-lg my-3'>Your overall rating : 7/10</h2>
        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,Your answer and feedback for improvement</h2>
    </div>
  )
}

export default Feedback