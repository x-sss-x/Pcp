import { Input } from '@/components/ui/input'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function page() {
  return (
    <div className='sticky top-0 py-3'>
        <div className='flex items-center group-focus-visible:border-primary border overflow-hidden border-slate-400 rounded-full' style={{padding:"0px 8px"}}>
            <AiOutlineSearch className='text-2xl'/>
            <Input className='border-b-0 focus:border-b-0' placeholder='Explore Topics'/>
        </div>
    </div>
  )
}
