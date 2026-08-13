"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../../components/seller/Sidebar";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../components/seller/Navbar";

const Layout = ({ children }) => {

  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    setUser,
    setIsSeller,
  } = useAppContext();

  const [checking, setChecking] = useState(true);

  useEffect(() => {

    // Login page does not need authentication
    if (pathname === "/seller/login") {
      setChecking(false);
      return;
    }

    const sellerId =
      localStorage.getItem("sellerId");

    const sellerEmail =
      localStorage.getItem("sellerEmail");

    const sellerRole =
      localStorage.getItem("sellerRole");

    // User is NOT logged in
    if (
      !sellerId ||
      !sellerEmail ||
      !sellerRole
    ) {
      router.replace("/seller/login");
      return;
    }

    // Restore user after refresh
    if (!user) {

      setUser({
        _id: sellerId,
        email: sellerEmail,
        role: sellerRole,
      });

      setIsSeller(true);
    }

    setChecking(false);

  }, [
    pathname,
    router,
    user,
    setUser,
    setIsSeller,
  ]);

  // While checking login
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Login page should NOT have sidebar
  if (pathname === "/seller/login") {
    return children;
  }

  // Logged-in seller pages
  return (
    <>
 <Navbar/>
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1">
        {children}
      </main>

    </div>
      </>
  );
};

export default Layout;