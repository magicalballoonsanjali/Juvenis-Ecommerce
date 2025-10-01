'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Suspense } from "react";

const AddAddress = () => {

    const {getToken,router}=useAppContext()

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            const token = await getToken()

            const {data} = await axios.post('/api/user/add-address',{address},{headers:{Authorization:`Bearer ${token}`}})

            if(data.success){
                toast.success(data.message)
                router.push('/cart')
                
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }



    }
// px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="flex md:px-40 p-5 justify-center items-center md:flex-row flex-col-reverse gap-4">
                <div className="md:w-1/2  flex justify-center items-center">
                <form onSubmit={onSubmitHandler} className="">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-[#009bf1]">Address</span>
                    </p>
                    <div className="space-y-3 max-w-sm mt-10">
                        <input
                            className="px-2 py-2.5 focus:border-[#009bf1] transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-[#009bf1] transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-[#009bf1] transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                        />
                        <textarea
                            className="px-2 py-2.5 focus:border-[#009bf1] transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
                            type="text"
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                        ></textarea>
                        <div className="flex space-x-3">
                            <input
                                className="px-2 py-2.5 focus:border-[#009bf1] transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                            />
                            <input
                                className="px-2 py-2.5 focus:border-[#009bf1] transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="State"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                value={address.state}
                            />
                        </div>
                    </div>
                    <button type="submit" className="max-w-sm w-full mt-6 bg-[#009bf1] text-white py-3 hover:bg-[#33769b] uppercase">
                        Save address
                    </button>
                </form>
                  </div>

                  <div className="md:w-1/2 bg-green-800">
                     <Image
                    className="w-full object-cover rounded"
                    src="/address.jpg"
                    alt="my_location_image"
                    width={500}
                    height={600}
                />
                
                  </div>
            </div>
            <Footer />
        </Suspense>
        </>
    );
};

export default AddAddress;