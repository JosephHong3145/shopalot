import { useParams } from "react-router-dom";
import React from "react";

export const ItemView = () => {
  const { itemId } = useParams();
  return <div>ItemView ({itemId})</div>;
};
