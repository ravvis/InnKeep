export const UserRoutes = [
  {
    name: "raise-issue",
    path: "/raise-issue/:id",
    component: () => import("@/modules/user/components/home")
  }
];
