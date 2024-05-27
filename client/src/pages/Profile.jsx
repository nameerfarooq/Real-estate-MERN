import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  SignOutUserFailed,
  SignOutUserStarted,
  SignOutUserSuccess,
  deleteUserFailed,
  deleteUserStarted,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [userDeleted, setuserDeleted] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [updateSuccess, setupdateSuccess] = useState(false);
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
  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setupdateSuccess(false);
        setFilePercentage(0);
      }, 1000);
    }
  }, [updateSuccess]);

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStarted());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailed(data.message));
        return;
      }
      setuserDeleted(true);
      setTimeout(() => {
        setuserDeleted(false);
        dispatch(deleteUserSuccess());
      }, 1000);
    } catch (error) {
      dispatch(deleteUserFailed(error.message));
    }
  };
  const handleSignOutUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(SignOutUserStarted());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignOutUserFailed(data.message));
        return;
      }
      dispatch(SignOutUserSuccess());
    } catch (error) {
      dispatch(SignOutUserFailed(error.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col  gap-4">
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
          onChange={handleFormData}
        />
        <input
          type="email"
          className="rounded-lg p-3 border outline-none"
          placeholder="email"
          id="email"
          onChange={handleFormData}
        />
        <input
          type="password"
          className="rounded-lg p-3 border outline-none"
          placeholder="password"
          id="password"
          onChange={handleFormData}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95"
        >
          Create listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOutUser}
          className="text-red-700 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700">{error || ""}</p>
      <p className="text-green-700">
        {updateSuccess ? "User updated successfully" : ""}
      </p>
      <p className="text-green-700">
        {userDeleted ? "User Deleted successfully" : ""}
      </p>
    </div>
  );
};

export default Profile;
