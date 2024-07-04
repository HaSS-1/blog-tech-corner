import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import {
  updateStart,
  updateFailure,
  updateSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateUser } from "../../../api/controllers/user.controller";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadSuccess,setimageFileUploadSuccess ] = useState(null)
  const [ImageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormDadat] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    console.log("uploading ...");
    setImageFileUploading(true)
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
            setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image...");

        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormDadat({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormDadat({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).lenght === 0) {
        setUpdateUserError('No changes made')
      return;
    }
    if (ImageFileUploading) {
        setUpdateUserError('Please wait for image to upload')
        return
    }
    try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!res.ok) {
            dispatch(updateFailure(data.message))
            setUpdateUserError(data.message)
        }else {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User's profile updated successfully")
        }
    } catch (error) {
        dispatch(updateFailure(error.message))
        setUpdateUserError(error.message)
    }
  };
  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="font-semibold text-2xl text-center my-7 ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="self-center relative size-32 rounded-full cursor-pointer shadow-md overflow-hidden"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user photo"
            className={`rounded-full size-full object-cover border-8 border-[lightgray]
             ${
               imageFileUploadProgress &&
               imageFileUploadProgress < 100 &&
               "opacity-60"
             }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id=""
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          {loading ? 'Loading...' : 'Update'}
          
        </Button>
      </form>
    <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
    </div>
    {updateSuccess && (
        <Alert color='success' className="mt-5">
            {updateUserSuccess}
        </Alert>
    )}
    {updateUserError && (
        <Alert color='failure' className="mt-5">
            {updateUserError}
        </Alert>
    )}
    {error && (
        <Alert color='failure' className="mt-5">
            {error}
        </Alert>
    )}
    </div>
  );
}
