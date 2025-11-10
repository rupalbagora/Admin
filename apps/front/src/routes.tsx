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
// const SuperUserDeshboard = lazy(
//   () => import("./commonComp/Dashbordes/SuperUserDeshboard")
// );
const AdminDeshboard = lazy(() => import("./commonComp/Dashbordes/AdminDeshboard"));
const UserDeshboard = lazy(() => import("./commonComp/Dashbordes/UserDeshboard"));
const SubscriptionManagement = lazy(() => import("./commonComp/SubscriptionManagement/SubscriptionManagement"));



// SUB-ADMIN
//const UploadCatalog= lazy (()=> import("./subadminComponents/catalog/UploadCatalog"));
//const UploadReferFriend= lazy (()=> import("./subadminComponents/referfriend/UploadReferFriend"));
const UploadYoutube = lazy (()=> import("../src/subadminComponents/youtube/UploadYoutube"));
const UploadCertificate = lazy(() => import("../src/subadminComponents/certificate/ManageCertificates"));
const AppointmentForm = lazy(() => import("../src/subadminComponents/AppointmentForm/AppointmentForm"));
//Male Components
const MaleSpecialOffers = lazy(()=>import("./subadminComponents/Male/specialoffers/MaleSpecialOffers"));
const ManageMalePackages = lazy(()=>import("./subadminComponents/Male/ourpackages/ManageMalePackages"));
const MaleProducts = lazy(()=>import("./subadminComponents/Male/products/MaleProducts"));
const MaleProductPackages = lazy(()=>import("./subadminComponents/Male/productpackages/MaleProductPackages"));
//Female Components
const FemaleSpecialOffers = lazy(()=>import("./subadminComponents/female/specialoffers/FemaleSpecialOffers"));
const ManageFemalePackages = lazy(()=>import("./subadminComponents/female/ourpackages/FemalePackages"));
const FemaleProducts = lazy(()=>import("./subadminComponents/female/products/FemaleProducts"));
const FemaleProductPackages = lazy(()=>import("./subadminComponents/female/productpackages/FemaleProductPackages"));
const ManageAboutSalon = lazy(()=>import("./subadminComponents/AboutOurSalon/ManageAboutSalon"));
//Documents
const ManageAboutUs = lazy(()=>import("./subadminComponents/documents/AboutUs/ManageAboutUs"));
const ManagePrivacyPolicy = lazy(()=>import("./subadminComponents/documents/PrivacyPolicy/ManagePrivacyPolicy"));
const ManageTermsCondition = lazy(()=>import("./subadminComponents/documents/TermsAndConditions/ManageTermsCondition"));

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

    {
          path: "Appointment",
          element: (
            <Suspense fallback={Loader}>
              < AppointmentForm/>
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
              < MaleSpecialOffers/>
            </Suspense>
          ),
        },
        {
          path: "our-service",
          element: (
            <Suspense fallback={Loader}>
              {/* <UploadOurservice /> */}
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={Loader}>
              <MaleProducts  />
            </Suspense>
          ),
        },
        // {
        //   path: "products/categories",
        //   element: (
        //     <Suspense fallback={Loader}>
        //       <UploadCategories />
        //     </Suspense>
        //   ),
        // },
        {
          path: "our-package",
          element: (
            <Suspense fallback={Loader}>
              <ManageMalePackages />
            </Suspense>
          ),
        },
        {
          path: "product-package",
          element: (
            <Suspense fallback={Loader}>
              <MaleProductPackages />
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
              <FemaleSpecialOffers />
            </Suspense>
          ),
        },
        {
          path: "our-service",
          element: (
            <Suspense fallback={Loader}>
              {/* <UploadOurservice /> */}
            </Suspense>
          ),
        },
         {
          path: "products",
          element: (
            <Suspense fallback={Loader}>
              <FemaleProducts  />
            </Suspense>
          ),
        },
        // {
        //   path: "products/details",
        //   element: (
        //     <Suspense fallback={Loader}>
        //       <UploadProduct />
        //     </Suspense>
        //   ),
        // },
        // {
        //   path: "products/categories",
        //   element: (
        //     <Suspense fallback={Loader}>
        //       <UploadCategories />
        //     </Suspense>
        //   ),
        // },
        {
          path: "our-package",
          element: (
            <Suspense fallback={Loader}>
              <ManageFemalePackages />
            </Suspense>
          ),
        },
        {
          path: "product-package",
          element: (
            <Suspense fallback={Loader}>
              <FemaleProductPackages  />
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
          <UploadCertificate  />
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
  path: "about-salon",
  element: (
    <Suspense fallback={Loader}>
      <ManageAboutSalon />
    </Suspense>
  ),
},
    // {
    //   path: "catalog",
    //   element: (
    //     <Suspense fallback={Loader}>
    //       <UploadCatalog />
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: "Refer-Friend",
    //   element: (
    //     <Suspense fallback={Loader}>
    //       <UploadReferFriend />
    //     </Suspense>
    //   ),
    // },
    {
      path: "About-Us",
      element: (
        <Suspense fallback={Loader}>
          <ManageAboutUs />
        </Suspense>
      ),
    },
    {
      path: "Privacy-Policy",
      element: (
        <Suspense fallback={Loader}>
          <ManagePrivacyPolicy  />
        </Suspense>
      ),
    },
    {
      path: "Terms-Conditions",
      element: (
        <Suspense fallback={Loader}>
          <ManageTermsCondition />
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
