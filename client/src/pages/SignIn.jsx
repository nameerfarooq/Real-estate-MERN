import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setformData] = useState({
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
      const res = await fetch("/api/auth/signin", {
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
      navigate("/");
    } catch (error) {
      console.log(JSON.parse(error));
      setLoading(false);
      setError(JSON.parse(error));
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
  
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
            formData?.email?.length <= 0 ||
            formData?.password?.length <= 0
          }
          className="rounded-lg bg-slate-700 text-white text-center uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed p-3"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-1 mt-5">
        <p>Dont Have an account ?</p>
        <Link to={"/sign-up"} className="text-blue-700">
          Sign up
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default SignIn;
