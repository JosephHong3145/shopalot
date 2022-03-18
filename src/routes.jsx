import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import React from "react";

import {
  EditItemView,
  HomeView,
  ItemView,
  ItemsView,
  LoginView,
  MyCartView,
  MyOrdersView,
  MyProfileView,
  NotFoundView,
  OrderConfirmationView,
  ProfileView,
  SignupView,
} from "./components/views";
import { Paths } from "./paths";
import { useAuthState } from "./contexts/AuthContext";

const RequireAuth = ({ children }) => {
  const { loading, isAuthenticated } = useAuthState();
  const location = useLocation();
  return loading ? null : isAuthenticated ? (
    children
  ) : (
    <Navigate to={Paths.login()} replace state={{ path: location.pathname }} />
  );
};

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
      <Route
        exact
        path={Paths.myCartView()}
        element={
          <RequireAuth>
            <MyCartView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.orderConfirmation()}
        element={
          <RequireAuth>
            <OrderConfirmationView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.items()}
        element={
          <RequireAuth>
            <ItemsView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.item()}
        element={
          <RequireAuth>
            <ItemView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.createItem()}
        element={
          <RequireAuth>
            <EditItemView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.editItem()}
        element={
          <RequireAuth>
            <EditItemView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.myOrders()}
        element={
          <RequireAuth>
            <MyOrdersView />
          </RequireAuth>
        }
      />
      {/* Authentication */}
      <Route exact path={Paths.signup()} element={<SignupView />} />
      <Route exact path={Paths.login()} element={<LoginView />} />
      {/* Default */}
      <Route path="*" element={<NotFoundView />} />
    </Switch>
  );
};
