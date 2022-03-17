import { collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState } from "react";

export const ReviewItems = () => {
  const { firestore: db } = useFirebase();
  const { user } = useAuthState();
  const [snapshot, laoding] = useCollection(
    query(collection(db, "cart"), where("userID", "==", user.uid))
  )
  const [items, setItems] = useState([]);

  // Starts fetching with page loading
  window.addEventListener("load", () => {
    FetchItems();
  });

  const FetchItems = () => {
    useFirebase
      .collection("cart")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const item = element.cart();
          setItems((arr) => [...arr, item]);
        });
      });
  };

  return (
    <div>
      <h3>hi</h3>
    </div>
  );
};
