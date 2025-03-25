"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';



function Header() {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    console.log(path)
  }, [])

  const handleUpgrade = () => {
    router.push('/upgrade');
  }

  const handleWork = () => {
    router.push('/work');
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  return (
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
      <UserButton />
    </div>
  )
}

export default Header