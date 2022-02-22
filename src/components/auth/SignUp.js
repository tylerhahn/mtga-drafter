import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../services/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState();

  const handleSignUp = async () => {
    if (pw === pw2 && email) {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          addUserToDb(userCredential);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const addUserToDb = (auth) => {
    console.log(auth);
    const userRef = doc(db, "users", auth.user.uid);
    setDoc(userRef, { uid: auth.user.uid });
  };

  return (
    <div className="bg-gray-500 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) => setPw2(e.target.value)}
          />

          <div
            onClick={() => handleSignUp()}
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </div>
          {error && <h2>{error}</h2>}

          {/* <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div> */}
        </div>

        <div className="text-gray-100 mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
