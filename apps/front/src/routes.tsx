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
// const AdminLayout = lazy(() => import("./layoutes/AdminLayout"));
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
const UploadCategories = lazy (()=> import("../src/subadminComponents/products/AllCategories/UploadCategories"));
const UploadProduct = lazy (()=> import("../src/subadminComponents/products/ProductsDetails/UploadProduct"));
const UploadSpecialOffers = lazy (()=> import("../src/subadminComponents/specialoffers/UploadSpecialOffers"));
const UploadYoutube = lazy (()=> import("../src/subadminComponents/youtube/UploadYoutube"));
const UploadCatalog= lazy (()=> import("./subadminComponents/catalog/UploadCatalog"));
const UploadReferFriend= lazy (()=> import("./subadminComponents/referfriend/UploadReferFriend"));
const UploadAboutUs= lazy (()=> import("./subadminComponents/aboutus/UploadAboutUs"));
const UploadPrivacyPolicy= lazy (()=> import("./subadminComponents/privacypolicy/UploadPrivacyPolicy"));
const UploadTermsConditions= lazy (()=> import("./subadminComponents/terms&conditions/UploadTermsConditions"));
const UploadOurservice = lazy (()=> import("../src/subadminComponents/ourservice/UploadOurservice"));
const UploadCertificate = lazy(() => import("./subadminComponents/certificate/UploadCertificate"));
const ManagePackages = lazy (() => import("./subadminComponents/ourpackages/ManagePackages"));  
const ManageProductPackages = lazy(()=> import("./subadminComponents/productpackages/ManageProductPackages"));

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
                        <ManageUsers />
            {/* <SuperUserDeshboard /> */}
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
    // Default admin dashboard
    {
      index: true,
      element: (
        <Suspense fallback={Loader}>
          <AdminDeshboard />
        </Suspense>
      ),
    },
     {
          path: "AdminDeshboard",
          element: (
            <Suspense fallback={Loader}>
              < AdminDeshboard/>
            </Suspense>
          ),
        },

    
      
    // 🔹 MALE ROUTES
    {
      path: "male",
      children: [
        {
          path: "special-offers",
          element: (
            <Suspense fallback={Loader}>
              < UploadSpecialOffers/>
            </Suspense>
          ),
        },
        {
          path: "our-service",
          element: (
            <Suspense fallback={Loader}>
              <UploadOurservice />
            </Suspense>
          ),
        },
        {
          path: "products/details",
          element: (
            <Suspense fallback={Loader}>
              <UploadProduct />
            </Suspense>
          ),
        },
        {
          path: "products/categories",
          element: (
            <Suspense fallback={Loader}>
              <UploadCategories />
            </Suspense>
          ),
        },
        {
          path: "our-package",
          element: (
            <Suspense fallback={Loader}>
              <ManagePackages />
            </Suspense>
          ),
        },
        {
          path: "product-package",
          element: (
            <Suspense fallback={Loader}>
              <ManageProductPackages />
            </Suspense>
          ),
        },
      ],
    },

    // 🔹 FEMALE ROUTES
    {
      path: "female",
      children: [
        {
          path: "special-offers",
          element: (
            <Suspense fallback={Loader}>
              <UploadSpecialOffers />
            </Suspense>
          ),
        },
        {
          path: "our-service",
          element: (
            <Suspense fallback={Loader}>
              <UploadOurservice />
            </Suspense>
          ),
        },
        {
          path: "products/details",
          element: (
            <Suspense fallback={Loader}>
              <UploadProduct />
            </Suspense>
          ),
        },
        {
          path: "products/categories",
          element: (
            <Suspense fallback={Loader}>
              <UploadCategories />
            </Suspense>
          ),
        },
        {
          path: "our-package",
          element: (
            <Suspense fallback={Loader}>
              <ManagePackages />
            </Suspense>
          ),
        },
        {
          path: "product-package",
          element: (
            <Suspense fallback={Loader}>
              <ManageProductPackages />
            </Suspense>
          ),
        },
      ],
    },

    // 🔹 OTHER ADMIN ROUTES
    {
      path: "Upload-Certificate",
      element: (
        <Suspense fallback={Loader}>
          <UploadCertificate />
        </Suspense>
      ),
    },
    {
      path: "youtube",
      element: (
        <Suspense fallback={Loader}>
          <UploadYoutube />
        </Suspense>
      ),
    },
    {
      path: "catalog",
      element: (
        <Suspense fallback={Loader}>
          <UploadCatalog />
        </Suspense>
      ),
    },
    {
      path: "Refer-Friend",
      element: (
        <Suspense fallback={Loader}>
          <UploadReferFriend />
        </Suspense>
      ),
    },
    {
      path: "About-Us",
      element: (
        <Suspense fallback={Loader}>
          <UploadAboutUs />
        </Suspense>
      ),
    },
    {
      path: "Privacy-Policy",
      element: (
        <Suspense fallback={Loader}>
          <UploadPrivacyPolicy />
        </Suspense>
      ),
    },
    {
      path: "Terms-Conditions",
      element: (
        <Suspense fallback={Loader}>
          <UploadTermsConditions />
        </Suspense>
      ),
    },
    {
      path: "profile",
      element: (
        <Suspense fallback={Loader}>
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
  { path: "*", element: <>error</> },
]);
