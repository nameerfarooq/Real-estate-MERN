import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({
      ...formData,
      [id]: value,
    });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        console.log(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="rounded-lg p-3"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg p-3"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg p-3"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={
            loading ||
            formData?.username?.length <= 0 ||
            formData?.email?.length <= 0 ||
            formData?.password?.length <= 0
          }
          className="rounded-lg bg-slate-700 text-white text-center uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed p-3"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-1 mt-5">
        <p>Have an account ?</p>
        <Link to={"/sign-in"} className="text-blue-700">
          Sign in
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default SignUp;
