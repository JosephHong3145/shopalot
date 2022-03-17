import { ItemsView } from "./ItemsView";
import OverallNavBar from "../navigation/Header";
import React, { Component } from "react";
//  import Swipe from "../navigation/SwipeBar";

export const HomeView = () => {
  return (
    <div>
      <OverallNavBar />
      <ItemsView />
    </div>
  );
};
