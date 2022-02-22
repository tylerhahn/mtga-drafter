import axios from "axios";
import React, { createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [meta, setMeta] = React.useState([]);

  console.log(user);

  // const userId = "UQRZEA3VWFDI5AQV5FSA7H7MSQ";
  // const user.authToken = "92887d8b-a104-43b7-9518-5d73aa9837e3"

  const prodUrl = "https://mtga-anywhere.herokuapp.com";

  const fetchData = () => {
    if (user && user.authToken) {
      axios
        .get(
          `${prodUrl}/https://api.mtga.untapped.gg/api/v1/profiles/users/${user.authToken}/players/${user.userId}/`
        )
        .then((res) => {
          setMeta(res.data);
        });
    }
  };

  const fetchUser = () => {
    if (user && user.userId) {
      axios
        .get(
          `${prodUrl}/https://api.mtga.untapped.gg/api/v1/account/collections/${user.userId}?user_id=${user.authToken}`
        )
        .then((res) => {
          setUser({ ...user, ...res.data });
        });
    }
  };

  const fetchUserFromFirebase = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUser({ ...doc.data(), user });
        });
      } else {
        console.log("nope");
      }
    });
  };

  React.useEffect(() => {
    fetchUserFromFirebase();
  }, []);

  React.useEffect(() => {
    fetchUser();
    fetchData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        meta,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
