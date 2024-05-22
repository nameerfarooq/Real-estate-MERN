import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  console.log(filePercentage);
  console.log(fileUploadError);
  console.log(formData);
  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col  gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <div className="relative w-24 h-24 rounded-full mx-auto overflow-hidden mt-2">
          <img
            src={formData.avatar || currentUser?.avatar}
            alt="profile"
            className="rounded-full w-24 h-24 object-cover cursor-pointer self-center z-1"
          />
          <div
            onClick={() => fileRef.current.click()}
            className="absolute top-0 left-0 flex items-center justify-center z-2 bg-slate-700 opacity-0 hover:opacity-80  w-24 h-24 rounded-full cursor-pointer"
          >
            <FaEdit color="white" className="w-25 h-25 " />
          </div>
        </div>
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${filePercentage}%`}
            </span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="rounded-lg p-3 border outline-none"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          className="rounded-lg p-3 border outline-none"
          placeholder="email"
          id="email"
        />
        <input
          type="password"
          className="rounded-lg p-3 border outline-none"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
