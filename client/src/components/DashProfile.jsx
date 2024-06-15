import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'
export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
        <h1 className='font-semibold text-2xl text-center my-7 '>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='self-center size-32 rounded-full cursor-pointer shadow-md overflow-hidden'>
            <img src={currentUser.profilePicture} alt='user photo' className='rounded-full size-full object-cover  ring- ring-salt-500 ' />
        
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
            <TextInput type='email' id='' placeholder='email' defaultValue={currentUser.email} />
            <TextInput type='password' id='password' placeholder='password' />
            <Button type='submit' gradientDuoTone='purpleToPink'> Submit </Button>
           </form>
    </div>
  )
}
