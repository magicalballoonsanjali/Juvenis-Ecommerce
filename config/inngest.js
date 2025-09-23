import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "juvenis-next" });

//inngest function to save user data to database 
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email:  email_addresses?.[0]?.email_address || "",
      name: `${first_name} ${last_name}`,
      // fallback if image_url is null/undefined
      imageURL: image_url ? image_url : "https://imgs.search.brave.com/q0q5V368T2MZ8e9Lpl_0HpWtO_txiFK6td_bv9zpzW0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC85Ny82OC9h/Y2NvdW50LWF2YXRh/ci1kYXJrLW1vZGUt/Z2x5cGgtdWktaWNv/bi12ZWN0b3ItNDQ0/Mjk3NjguanBn",
    };

    await connectDB();

    try {
  await User.create(userData);
} catch (err) {
  if (err.name === "ValidationError") {
    console.error("Validation failed:", err.message);
    return;
  }
  if (err.code === 11000) {
    console.error("Duplicate key error:", err.message);
    return;
  }
  throw err;
}

  }
);



//inngest function to update user data in database
export const syncUserUpdation=inngest.createFunction(
    {   
        id:'update-user-from-clerk'

    },
    {
        event:'clerk/user.updated'
    },
    async ({event})=>{
         const {id,first_name,last_name,email_addresses,image_url}= event.data
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + ' ' + last_name,
            imageURL:image_url
    }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
}
)


//inngest function to delete user from database

export const syncUserDeletion=inngest.createFunction(
    {
        id:'delete-user-with-clerk'
    },{
        event:'clerk/user.deleted'
    },
    async ({event})=>{
        const {id}=event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)