import { Route, Routes as Switch } from "react-router-dom";
import React from "react";

import {
  HomeView,
  ItemView,
  ItemsView,
  LoginView,
  MyProfileView,
  NotFoundView,
  ProfileView,
  SignupView,
  VerificationView,
} from "./components/views";
import { Paths } from "./paths";
import { RequireAuth } from "./components/routing/RequireAuth";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={Paths.home()} element={<HomeView />} />
      <Route exact path={Paths.profile()} element={<ProfileView />} />
      <Route
        exact
        path={Paths.myProfile()}
        element={
          <RequireAuth>
            <MyProfileView />
          </RequireAuth>
        }
      />
      <Route exact path={Paths.items()} element={<ItemsView />} />
      <Route exact path={Paths.item()} element={<ItemView />} />
      {/* Authentication */}
      <Route exact path={Paths.signup()} element={<SignupView />} />
      <Route exact path={Paths.login()} element={<LoginView />} />
      <Route exact path={Paths.verify()} element={<VerificationView />} />
      {/* Default */}
      <Route path="*" element={<NotFoundView />} />
    </Switch>
  );
};
