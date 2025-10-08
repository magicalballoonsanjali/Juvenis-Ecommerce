'use client'
import { productsDummyData, userDummyData } from "@/assets/juvenis-assets";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export const AppContext = createContext();

export const useAppContext = () => {
    
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const {user}= useUser()//to get user weather it is logged in or not

    const {getToken} = useAuth()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

   const [wishlist, setWishlist] = useState([]);

 

    const fetchProductData = async () => {
       try{
        const {data} = await axios.get('/api/product/list')

        if(data.success){
            setProducts(data.products)
        }else{
            toast.error(data.message)
        }
       }
       catch(error){
            toast.error(error.message)
       }
    }

    const fetchUserData = async () => {

        try{

        if(user.publicMetadata.role === 'seller'){
            setIsSeller(true)
        }
        const token = await getToken()

        const {data} = await axios.get('/api/user/data',{headers:{Authorization:`Bearer ${token}`}})

        if(data.success){
            setUserData(data.user)
           setCartItems(data.user?.cartItems || {}) 
        }else{
            toast.error(data.message)
        }

        }
        catch(error){
            toast.error(error.message)
        }
    }

    const addToCart = async (itemId,forceAdd=true) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if(forceAdd){

                cartData[itemId] += 1;
             
            }
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart ");

        if(user){
            try{
                const token = await getToken()
                await axios.post('/api/cart/update',{cartData},{headers:{Authorization:`Bearer ${token}`}})
                
            }
            catch(error){
                toast.error(error.message)
            }
        }

    }







    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

        if(user){
            try{
                const token = await getToken()
                await axios.post('/api/cart/update',{cartData},{headers:{Authorization:`Bearer ${token}`}})
                toast.success("Cart Updated");
            }
            catch(error){
                toast.error(error.message)
            }
        }


    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return parseFloat(totalAmount.toFixed(2));
    }


//     const  toggleWishlist = (productId)=>{
//         let newWishlist = [...wishlist];
//         if(newWishlist.includes(productId)){
//             newWishlist=newWishlist.filter(id=>id!==productId);
//             toast.success('Removed from wishlist');
//         }else{
//             newWishlist.push(productId);
//             toast.success("Added to wishlist")
//         }
//         setWishlist(newWishlist)
//         // Optionally sync with backend
//   if (user) {
//     getToken().then(token => {
//       axios.post('/api/user/wishlist', { wishlist: newWishlist }, {
//         headers: { Authorization: `Bearer ${token}` }
//       }).catch(err => toast.error(err.message));
//     });
//   }
//     }

const toggleWishlist = async (productId) => {
  try {
    let updatedList;

    if (!wishlist.includes(productId)) {
      updatedList = [...wishlist, productId];
    } else {
      updatedList = wishlist.filter((id) => id !== productId);
    }

    setWishlist(updatedList);
    const token = await getToken();
    const { data } = await axios.post(
      "/api/user/wishlist",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Wishlist updated");
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};


const fetchWishlist = async () => {
  if (!user) return;
  try {
    const token = await getToken();
    const res = await axios.get("/api/user/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) setWishlist(res.data.wishlist);
  } catch (err) { console.error(err); }
};


useEffect(() => {
  if (user) fetchWishlist();
  else setWishlist([]);
}, [user]);


    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if(user){
          fetchUserData()
        }
    
    }, [user])

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,user, toggleWishlist,wishlist
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}