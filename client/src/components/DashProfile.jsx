import { Button, TextInput } from 'flowbite-react'
import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import {app} from '../firebase'

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const filePickerRef = useRef();
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    console.log(imageFileUploadProgress, imageFileUploadError)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
        
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);
        const uploadImage = async () => {
            console.log('uploading ...');

            const storage = getStorage(app);
            const fileName = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImageFileUploadProgress(progress.toFixed(0))
                },(error) => {
                    setImageFileUploadError('Could not upload image...')
                    console.log('')
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageFileUrl(downloadURL)
                    })
                }
            )

        };
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
        <h1 className='font-semibold text-2xl text-center my-7 '>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='self-center size-32 rounded-full cursor-pointer shadow-md overflow-hidden ring-8 ring-salte-500'
            onClick={()=>filePickerRef.current.click()}>
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
