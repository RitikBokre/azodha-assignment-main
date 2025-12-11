import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { resetOnboarding } from "../store/slices/onboardingSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.auth);
  const { personalInfo, favoriteSongs } = useAppSelector(
    (state) => state.onboarding
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-6 sm:py-12 ">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 ">
          <div className="relative px-4 py-10 bg-base-100 shadow-xl rounded-2xl sm:rounded-3xl sm:p-10 relative">
            <div className="max-w-md mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome, {username}!
                </h1>
                <p className="text-base text-gray-600">
                  Your onboarding is complete. Here's your summary.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                  Personal Information
                </h2>

                {personalInfo.profilePicture && (
                  <div className="flex justify-center py-2">
                    <div className="avatar">
                      <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={personalInfo.profilePicture} alt="Profile" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pl-2">
                  <div className="flex justify-between items-center border-b border-base-200 pb-2">
                    <span className="text-gray-500 font-medium">Name</span>
                    <span className="font-semibold text-gray-900">
                      {personalInfo.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-base-200 pb-2">
                    <span className="text-gray-500 font-medium">Age</span>
                    <span className="font-semibold text-gray-900">
                      {personalInfo.age}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-base-200 pb-2">
                    <span className="text-gray-500 font-medium">Email</span>
                    <span className="font-semibold text-gray-900">
                      {personalInfo.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                  Favorite Songs
                </h2>
                <div className="flex flex-wrap gap-2 pl-2">
                  {favoriteSongs.map((song, index) => (
                    <div
                      key={index}
                      className="badge badge-lg badge-outline gap-2 p-3"
                    >
                      <div className="badge badge-secondary badge-xs"></div>
                      {song}
                    </div>
                  ))}
                </div>
              </div>

              <div className="alert alert-success bg-green-50 text-green-800 border-green-200">
                <span className="text-xs">
                  Payment info saved locally (Demo).
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <div
                className="btn btn-error btn-sm gap-2"
                onClick={handleLogout}
              >
                logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
