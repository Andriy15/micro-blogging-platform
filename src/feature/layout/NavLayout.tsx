import { Link } from "react-router-dom";
import { useUser } from "../auth/auth.user";
import { supabase } from "../../supabaseClient";
import { notify } from "../../shared/notifyError";

interface NavLayoutProps {
  children: React.ReactNode;
}

export function NavLayout({ children }: NavLayoutProps) {
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      notify(error.message)
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Micro-Blogging Platform
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {user ? (
              <>
                <Link
                  to="/"
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}


// b63b6269a1d8451091748df7e17a9e31