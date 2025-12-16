// import connectDB from "../../../../config/db";
// import User from "../../../../models/User";
// import Address from "../../../../models/Address";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const {
//       fullName,
//       email,
//       phoneNumber,
//       pincode,
//       area,
//       city,
//       state,
//       cartItems = {},
//     } = await request.json();

//     if (!fullName || !email || !phoneNumber) {
//       return NextResponse.json({
//         success: false,
//         message: "Name, email, and phone are required",
//       });
//     }

//     await connectDB();

//     // ✅ Create user WITHOUT _id (MongoDB will generate automatically)
//     const newUser = await User.create({
//       name: fullName,
//       email,
//       cartItems,
//       wishlist: [],
//     });

//     // ✅ Create address linked to the new user
//     const newAddress = await Address.create({
//       userId: newUser._id,
//       fullName,
//       phoneNumber,
//       pincode,
//       area,
//       city,
//       state,
//     });

//     return NextResponse.json({
//       success: true,
//       message: "User and address created successfully",
//       user: newUser,
//       address: newAddress,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }



import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import Address from "../../../../models/Address";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      pincode,
      area,
      city,
      state,
      cartItems = {},
    } = await request.json();

    if (!fullName || !email || !phoneNumber) {
      return NextResponse.json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    await connectDB();

    // 🔍 STEP 1: Check if user already exists
    let user = await User.findOne({ email });

    // 🆕 STEP 2: Create user only if NOT exists
    if (!user) {
      user = await User.create({
        name: fullName,
        email,
        cartItems,
        wishlist: [],
        isGuest: true,
      });
    } else {
      // 🔄 STEP 3: Merge cart if user exists
      user.cartItems = {
        ...user.cartItems,
        ...cartItems,
      };
      await user.save();
    }

    // 🏠 STEP 4: Always create address (linked to user)
    const newAddress = await Address.create({
      userId: user._id,
      fullName,
      phoneNumber,
      pincode,
      area,
      city,
      state,
    });

    return NextResponse.json({
      success: true,
      message: "Address saved successfully",
      user,
      address: newAddress,
    });

  } catch (error) {
    console.error(error);

    // 🛡️ DUPLICATE SAFETY
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        message: "Email already exists. Please login to continue.",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
