"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';


function Header() {
   const path=usePathname();
   useEffect(()=>{
    console.log(path)
   },[])
  return (
    <div className='flex items-center justify-between p-6 bg-secondary shadow-sm'>
        <Image src={'/mainlogo3.png'} width={160} height={100} alt='logo'/>
        
        <nav>
        <ul className='hidden md:flex items-center gap-5'>
            <li className={` hover:font-bold transition-all cursor:pointer
              ${path=='/dashboard'&&'text-primary font-bold'}
              `}>Dashboard</li>
            <li className={` hover:font-bold transition-all cursor:pointer
              ${path=='/dashboard/questions'&&'text-primary font-bold'}
              `}>Questions</li>
            <li className={` hover:font-bold transition-all cursor:pointer
              ${path=='/dashboard/upgrade'&&'text-primary font-bold'}
              `}>Upgrade</li>
            <li className={` hover:font-bold transition-all cursor:pointer
              ${path=='/dashboard/work'&&'text-primary font-bold'}
              `}>How it Works?</li>      
        </ul>
        </nav>
        <UserButton/>
    </div>
  )
}

export default Header