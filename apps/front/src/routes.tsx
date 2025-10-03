import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RoleBasedLayout } from "./layoutes/RoleBasedLayout";
// import SubscriptionManagement from "./commonComp/SubscriptionManagement/SubscriptionManagement";

// Lazy load layouts and pages
const SubscriptionPlans = lazy(
  () => import("./commonComp/SubscriptionManagement/SubscriptionPlans")
);
const DashboardRedirect = lazy(() => import("./pages/Dashboard/Deshboard"));
const Layout = lazy(() => import("./layoutes/Layout"));
const AdminLayout = lazy(() => import("./layoutes/AdminLayout"));
const UserLayout = lazy(() => import("./layoutes/UserLayout"));
const LoginPage = lazy(() => import("./commonComp/AuthPages/Login"));
const RegisterPage = lazy(() => import("./commonComp/AuthPages/Register"));
const RegisterReff = lazy(() => import("./commonComp/AuthPages/RegisterReff"));
const UnauthorizedPage = lazy(
  () => import("./commonComp/UnauthorizedPage/UnauthorizedPage")
);
const Loader = <div className="text-center py-10">Loading...</div>;
const ManageUsers = lazy(() => import("./components/userComponents/Users"));
const UpdateProfile = lazy(
  () => import("./commonComp/AuthPages/UpdateProfile")
);
const SuperUserDeshboard = lazy(
  () => import("./commonComp/Dashbordes/SuperUserDeshboard")
);
const AdminDeshboard = lazy(
  () => import("./commonComp/Dashbordes/AdminDeshboard")
);
const UserDeshboard = lazy(
  () => import("./commonComp/Dashbordes/UserDeshboard")
);
const SubscriptionManagement = lazy(
  () => import("./commonComp/SubscriptionManagement/SubscriptionManagement")
);

// SUB-ADMIN
const YoutubeLinks = lazy(
  () => import("./subadminComponents/youtubelinks/YoutubeLinks")
);

const UploadCertificate = lazy(() => import("./subadminComponents/uploads/UploadCertificate")) 


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loader}>
        <DashboardRedirect />
      </Suspense>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <Suspense fallback={Loader}>
        <RegisterReff />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={Loader}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={Loader}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={Loader}>
        <UnauthorizedPage />
      </Suspense>
    ),
  },

  {
    path: "/super-admin",
    element: (
      <Suspense fallback={Loader}>
        <RoleBasedLayout allowedRoles={["superadmin"]} layout={Layout} />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <SuperUserDeshboard />
          </Suspense>
        ),
      },
      { path: "settings", element: <div>Super Admin Settings</div> },
      { path: "settings", element: <div>Super Admin Settings</div> },
      {
        path: "users",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <ManageUsers />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <UpdateProfile />
          </Suspense>
        ),
      },
      {
        path: "Subscription-plan",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <SubscriptionManagement />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={Loader}>
        <RoleBasedLayout allowedRoles={["admin"]} layout={AdminLayout} />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <AdminDeshboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <ManageUsers />
          </Suspense>
        ),
      },
      {
        path: "/admin/Upload-Certificate",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <UploadCertificate />
          </Suspense>
        ),
      },
      {
        path: "youtubelinks",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <YoutubeLinks />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <UpdateProfile />
          </Suspense>
        ),
      },
      {
        path: "Subscription-plan",
        element: (
          <Suspense fallback={Loader}>
            <SubscriptionPlans />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
      <Suspense fallback={Loader}>
        <RoleBasedLayout allowedRoles={["user"]} layout={UserLayout} />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <UserDeshboard />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={Loader}>
            {" "}
            <UpdateProfile />
          </Suspense>
        ),
      },
    ],
  },
  { path: "*", element: <>eroror</> },
]);
