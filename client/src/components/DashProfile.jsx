import { Alert, Button, TextInput } from 'flowbite-react'
import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const filePickerRef = useRef();
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormDadat] = useState({})
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
            setImageFileUploadError(null);
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
                    setImageFileUploadError('Could not upload image...');
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageFileUrl(null)
                    console.log('')
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageFileUrl(downloadURL);
                        setFormDadat({ ...formData, profilePicture: downloadURL });
                    })
                }
            )

        };
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
        <h1 className='font-semibold text-2xl text-center my-7 '>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='self-center relative size-32 rounded-full cursor-pointer shadow-md overflow-hidden'
            onClick={()=>filePickerRef.current.click()}>

                {imageFileUploadProgress && (
                    <CircularProgressbar value={ imageFileUploadProgress || 0 } 
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                        root:{
                            width: '100%',
                            height: '100%',
                            position:'absolute',
                            top:'0',
                            left:'0'
                        },
                        path: {
                            stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                        }
                    }}
                    />
                )}
            <img src={imageFileUrl || currentUser.profilePicture} alt='user photo'
             className={`rounded-full size-full object-cover border-8 border-[lightgray]
             ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        
            </div>
            {imageFileUploadError && <Alert color='failure'>
                {imageFileUploadError}
            </Alert>}
            
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
            <TextInput type='email' id='' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
            <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
            <Button type='submit' gradientDuoTone='purpleToPink'> Submit </Button>
           </form>
    </div>
  )
}
