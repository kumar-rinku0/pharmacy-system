import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./provider/auth-provider";

const NoPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return null;
  //   return (
  //     <>
  //       <div className="min-h-[80vh] min-w-[100vw]">
  //         <div className="h-[90vh] w-full flex flex-col items-center justify-center gap-4 md:text-left md:mr-12">
  //           <h1 className="text-9xl font-bold text-red-500 mb-4 animate-bounce">
  //             404
  //           </h1>
  //           <p className="text-2xl font-semibold text-gray-800 mb-2">
  //             Oops! Page Not Found
  //           </p>
  //           <p className="text-lg text-center text-gray-600 mb-6">
  //             The page you're looking for doesn't exist.
  //           </p>
  //           <a
  //             href="/"
  //             className="flex justify-center w-40 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition duration-300"
  //           >
  //             Go Back Home
  //           </a>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default NoPage;
