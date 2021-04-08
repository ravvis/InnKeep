export const AuthRoutes = [
  {
    name: "signin",
    path: "/login",
    component: () => import("@/modules/auth/components/signin")
  },
  {
    name: "signup",
    path: "/register",
    component: () => import("@/modules/auth/components/signup")
  },
  {
    name: "logout",
    path: "logout",
    component: () => import("@/modules/auth/components/logout")
  }
];
