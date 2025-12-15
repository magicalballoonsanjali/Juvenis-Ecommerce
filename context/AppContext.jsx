// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

// export const AppContextProvider = (props) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
//   const router = useRouter();

//   // --- States ---
//   const [products, setProducts] = useState([]);
//   const [user, setUser] = useState(null); // no Clerk user, just mock or guest
  
 
//   const [isSeller, setIsSeller] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [wishlist, setWishlist] = useState([]);

//   const [guestId,setGuestId] = useState(null);

//   // useEffect(()=>{
//   //   let storedGuestId= localStorage.getItem("guestId");
//   //   if(!storedGuestId){
//   //     storedGuestId = crypto.randomUUID();
//   //     localStorage.setItem("guestId",storedGuestId)
//   //   }
//   //   setGuestId(storedGuestId);

//   //   if(!user){
//   //     mockLogin()
//   //   }
//   // },[])

//    useEffect(() => {
//     const loadUser = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;
      
//       try {
//         const { data } = await axios.get(`/api/user/get-user?userId=${userId}`);
//         if (data.success) {
//           setUser(data.user);
//         }
//       } catch (err) {
//         console.log("Error loading user:", err.message);
//       }
//     };
//     loadUser();
//   }, []);
  
//   const logout = () => {
//     localStorage.removeItem("userId");
//     toast.success("Logged out");
//     setUser(null);
//   }
  
//   // --- User mock system ---
//   const mockLogin = () => {
//     setUser({ name: "Guest User", email: "guest@example.com" });
//     toast.success("Logged in as Guest");
//   };

//   // --- Product Fetch ---
//   const fetchProductData = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) setProducts(data.products);
//       else toast.error(data.message);
//     } catch (error) {
//       toast.error("Failed to load products");
//     }
//   };

//   // --- CART (localStorage synced) ---
//   const syncCartToLocal = (data) => {
//     localStorage.setItem("cartItems", JSON.stringify(data));
//   };

//   const loadCartFromLocal = () => {
//     const stored = localStorage.getItem("cartItems");
//     if (stored) setCartItems(JSON.parse(stored));
//   };

//   const addToCart = (itemId, forceAdd = true) => {

//     const idToUse= user?.id || guestId;


//     let cartData = { ...cartItems };
//     if (cartData[itemId]) {
//       if (forceAdd) cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }
//     setCartItems(cartData);
//     syncCartToLocal(cartData);

//     axios.post("/api/cart/update",{userId:idToUse,cartItems:cartData}).catch(err=>console.log("failed to sync cart",err))


//     toast.success("Item added to cart");
//   };

//   const updateCartQuantity = (itemId, quantity) => {
//     let cartData = { ...cartItems };
//     if (quantity <= 0) delete cartData[itemId];
//     else cartData[itemId] = quantity;
//     setCartItems(cartData);
//     syncCartToLocal(cartData);
//   };

//   const getCartCount = () =>
//     Object.values(cartItems).reduce((a, b) => a + b, 0);

//   const getCartAmount = () => {
//     let total = 0;
//     for (const id in cartItems) {
//       const p = products.find((p) => p._id === id);
//       if (p) total += p.offerPrice * cartItems[id];
//     }
//     return total.toFixed(2);
//   };

//   // --- Wishlist (localStorage synced) ---
//   const toggleWishlist = (productId) => {
//     let updated = [...wishlist];
//     if (updated.includes(productId)) {
//       updated = updated.filter((id) => id !== productId);
//       toast.success("Removed from wishlist");
//     } else {
//       updated.push(productId);
//       toast.success("Added to wishlist");
//     }
//     setWishlist(updated);
//     localStorage.setItem("wishlist", JSON.stringify(updated));
//   };

//   const loadWishlistFromLocal = () => {
//     const stored = localStorage.getItem("wishlist");
//     if (stored) setWishlist(JSON.parse(stored));
//   };




//   // --- Init ---
//   useEffect(() => {
//     fetchProductData();
//     loadCartFromLocal();
//     loadWishlistFromLocal();
//   }, []);

//   const value = {
//     user,
//     setUser,
//     router,
//     currency,
//     isSeller,
//     setIsSeller,
//     products,
//     fetchProductData,
//     cartItems,
//     addToCart,
//     updateCartQuantity,
//     getCartCount,
//     getCartAmount,
//     wishlist,
//     toggleWishlist,
//     mockLogin,
//     logout,
//     setCartItems,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };







"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
const [userLoaded, setUserLoaded] = useState(false);
  // --- States ---
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [guestId, setGuestId] = useState(null);

  // --- Load logged-in user ---
 useEffect(() => {
  const loadUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setUserLoaded(true);
      return;
    }
    try {
      const { data } = await axios.post("/api/user/get-user", { userId });
      if (data.success) {
        localStorage.setItem("userId", data.user._id);
  setUser(data.user);
  setIsSeller(data.user.isSeller);   // ← IMPORTANT
}
    } catch (err) {
      console.error(err);
    } finally {
      setUserLoaded(true);
    }
  };
  loadUser();
}, []);




  // --- Logout ---
  const logout = () => {
    localStorage.removeItem("userId");
    toast.success("Logged out");
    setUser(null);
    setIsSeller(false);
  };

  // --- Mock login for guest ---
  const mockLogin = () => {
    const id = crypto.randomUUID();
    setGuestId(id);
    setUser({ name: "Guest User", email: "guest@example.com", _id: id });
    toast.success("Logged in as Guest");
  };

  // --- Product Fetch ---
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  // --- CART (localStorage synced) ---
  const syncCartToLocal = (data) => localStorage.setItem("cartItems", JSON.stringify(data));

  const loadCartFromLocal = () => {
    const stored = localStorage.getItem("cartItems");
    if (stored) setCartItems(JSON.parse(stored));
  };

  const addToCart = (itemId, forceAdd = true) => {
    const idToUse = user?._id || guestId;

    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      if (forceAdd) cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    syncCartToLocal(cartData);

    // Optional: sync to backend
    axios.post("/api/cart/update", { userId: idToUse, cartItems: cartData }).catch(err => console.log("Failed to sync cart", err));

    toast.success("Item added to cart");
  };

  const updateCartQuantity = (itemId, quantity) => {
    let cartData = { ...cartItems };
    if (quantity <= 0) delete cartData[itemId];
    else cartData[itemId] = quantity;

    setCartItems(cartData);
    syncCartToLocal(cartData);
  };

  const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const p = products.find((p) => p._id === id);
      if (p) total += p.offerPrice * cartItems[id];
    }
    return total.toFixed(2);
  };

  // --- Wishlist (localStorage synced) ---
  const toggleWishlist = (productId) => {
    let updated = [...wishlist];
    if (updated.includes(productId)) {
      updated = updated.filter((id) => id !== productId);
      toast.success("Removed from wishlist");
    } else {
      updated.push(productId);
      toast.success("Added to wishlist");
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const loadWishlistFromLocal = () => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  };

  // --- Init ---
  useEffect(() => {
    fetchProductData();
    loadCartFromLocal();
    loadWishlistFromLocal();
  }, []);

  const value = {
    user,
    setUser,
    router,
    currency,
    isSeller,
    setIsSeller,
    products,
    fetchProductData,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    wishlist,
    toggleWishlist,
    mockLogin,
    logout,
    setCartItems,
    guestId,
    userLoaded
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

