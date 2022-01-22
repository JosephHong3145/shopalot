import { useParams } from "react-router-dom";
import React from "react";

export const ProfileView = () => {
  const { profileId } = useParams();
  return <div>ProfileView ({profileId})</div>;
};
