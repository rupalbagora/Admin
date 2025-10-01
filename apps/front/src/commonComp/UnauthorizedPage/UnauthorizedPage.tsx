// commonComp/UnauthorizedPage.tsx
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon, ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../redux/hooks';

   const UnauthorizedPage = () => {

  const { user} = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">403 - Access Denied</h2>
          <p className="mt-2 text-sm text-gray-600">
            {user ? (
              <>Your account ({user.role}) doesn't have permission to access this page.</>
            ) : (
              <>You need to be logged in to access this page.</>
            )}
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col space-y-4">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Go to Your Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in to your account
              </Link>
            )}

            <Link
              to="/"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>

          {user?.role === 'user' && (
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Need elevated access? Contact your administrator.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UnauthorizedPage;