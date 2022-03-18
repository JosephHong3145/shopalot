import { collection, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../../../../contexts/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../../../contexts/FirebaseContext";
import React from "react";

const Item = ({ order, db }) => {
  const { storage } = useFirebase();
  const [imageURLs, setImageURLs] = React.useState(
    Array.from({ length: order.items.length }, () => "")
  );
  React.useEffect(() => {
    order.items.forEach((item, i) => {
      getDownloadURL(ref(storage, item.imageRef)).then((url) => {
        const newImageURLs = [...imageURLs];
        newImageURLs[i] = url;
        setImageURLs(newImageURLs);
      });
    });
  }, [imageURLs, order.items, storage]);

  return (
    <div>
      <h3>This is an item</h3>
      <p></p>
    </div>
  );
};

export function Cart() {
  return <Item />;
}
