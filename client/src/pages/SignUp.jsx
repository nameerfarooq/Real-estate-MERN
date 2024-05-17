import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Sign Up</h1>
      <form action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="rounded-lg p-3"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg p-3"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg p-3"
          id="password"
        />
        <button className="rounded-lg bg-slate-700 text-white text-center uppercase hover:opacity-95 disabled:opacity-80 p-3">
          Sign up
        </button>
      </form>
      <div className="flex gap-1 mt-5">
        <p>Have an account ?</p>
        <Link to={"/sign-in"} className="text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
