"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import { usePathname,useRouter } from 'next/navigation';
import { ArrowRightIcon } from "@heroicons/react/24/solid";


function MainPage() {
    const path = usePathname();
    const router = useRouter();
    useEffect(() => {
        console.log(path)
    }, []);

    const handleUpgrade = () => {
        router.push('/upgrade');
    };
    const handleWork = () => {
        router.push('/work');
    };
    const handleDashboard=()=>{
        router.push('/dashboard')
    }

    return (
        <div>
            <img loading="lazy" width="1200" height="300" decoding="async" data-nimg="1" className="absolute z-[-10] w-full" style={{ color: "transparent" }} src="/grid.svg"></img>
            <div className='flex items-center justify-between p-6 bg-secondary shadow-sm'>
                <button onClick={handleDashboard}>
                <Image src={'/mainlogo3.png'} width={160} height={100} alt='logo' />
                </button>
                <nav>
                    <ul className='hidden md:flex items-center gap-5'>
                        <li className={` hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard' && 'text-primary font-bold'}
                `} onClick={handleDashboard}>Dashboard</li>
                        <li className={` hover:font-bold transition-all cursor-pointer
                ${path == '/upgrade' && 'text-primary font-bold'}
                `} onClick={handleUpgrade}>Upgrade</li>
                        <li className={` hover:font-bold transition-all cursor-pointer
                ${path == '/work' && 'text-primary font-bold'}
                `} onClick={handleWork}>How it Works?</li>
                    </ul>
                </nav>
            </div>
            <section className="z-50">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your Personal AI Interview Coach</h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        "Double your chances of landing that job offer with our AI-powered interview prepration"
                    </p>
                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 
      transition-transform duration-300 hover:scale-105">
                            Get Started
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>
            </section>
            <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h2 className="font-bold text-3xl">How it Works?</h2>
                <h2 className="text-md text-gray-500">Give mock interview in just 3 simple steps</h2>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                    <a className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom h-8 w-8"></svg>
                        <h2 className="mt-4 text-xl font-bold text-black">Write prompt for your form</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium."
                        </p>
                    </a>

                    <a className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen h-8 w-8"></svg>
                        <h2 className="mt-4 text-xl font-bold text-black">Edit Your Form</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium."
                        </p>
                    </a>

                    <a className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 h-8 w-8"></svg>
                        <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium."
                        </p>
                    </a>
                </div>
                <div className='mt-12 text-center'>
                    <a href='/dashboard' className='inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring-yellow-400'>Get Started Today</a>
                </div>
            </section>

        </div>
    )
}

export default MainPage;