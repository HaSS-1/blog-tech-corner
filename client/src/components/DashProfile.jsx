import { Button, TextInput } from 'flowbite-react'
import {useState} from 'react'
import {useSelector} from 'react-redux'
export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const   [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
        
    }
    console.log(imageFileUrl)
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
        <h1 className='font-semibold text-2xl text-center my-7 '>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} />
            <div className='self-center size-32 rounded-full cursor-pointer shadow-md overflow-hidden ring-8 ring-salte-500'>
            <img src={imageFileUrl || currentUser.profilePicture} alt='user photo' className='rounded-full size-full object-cover  ' />
        
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
            <TextInput type='email' id='' placeholder='email' defaultValue={currentUser.email} />
            <TextInput type='password' id='password' placeholder='password' />
            <Button type='submit' gradientDuoTone='purpleToPink'> Submit </Button>
           </form>
    </div>
  )
}
