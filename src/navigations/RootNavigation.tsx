import React from "react";

import TabNavigation from "./TabNavigation";
import AuthStackNavigation from "./AuthStackNavigation";

import { useAuthStore } from "../store/useAuthStore";

const RootNavigation = () => {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn
  );

  return isLoggedIn ? (
    <TabNavigation />
  ) : (
    <AuthStackNavigation />
  );
};

export default RootNavigation;