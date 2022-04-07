import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import React from "react";

import {
  AboutUs,
  CheckoutView,
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
      <Route
        path={Paths.home()}
        element={<Navigate replace to={Paths.items()} />}
      />
      <Route path={Paths.profile()} element={<ProfileView />} />
      <Route
        path={Paths.myProfile()}
        element={
          <RequireAuth>
            <MyProfileView />
          </RequireAuth>
        }
      />
      <Route
        path={Paths.myCartView()}
        element={
          <RequireAuth>
            <MyCartView />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={Paths.payment()}
        element={
          <div>
            <RequireAuth>
              <CheckoutView />
            </RequireAuth>
          </div>
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
        path={Paths.items()}
        element={
          <RequireAuth>
            <ItemsView />
          </RequireAuth>
        }
      />
      <Route
        path={Paths.item()}
        element={
          <RequireAuth>
            <ItemView />
          </RequireAuth>
        }
      />
      <Route
        path={Paths.createItem()}
        element={
          <RequireAuth>
            <EditItemView />
          </RequireAuth>
        }
      />
      <Route
        path={Paths.editItem()}
        element={
          <RequireAuth>
            <EditItemView />
          </RequireAuth>
        }
      />
      <Route
        path={Paths.myOrders()}
        element={
          <RequireAuth>
            <MyOrdersView />
          </RequireAuth>
        }
      />
      <Route exact path={Paths.aboutUs()} element={<AboutUs />} />
      {/* Authentication */}
      <Route path={Paths.signup()} element={<SignupView />} />
      <Route path={Paths.login()} element={<LoginView />} />
      {/* Payment Flow while Making it */}
      <Route path={Paths.payment()} element={<CheckoutView />} />
      {/* Default */}
      <Route path="*" element={<NotFoundView />} />
    </Switch>
  );
};
