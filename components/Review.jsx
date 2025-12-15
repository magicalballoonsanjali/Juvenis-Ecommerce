"use client";
import { Star } from "lucide-react";

export default function Review() {
  const reviews = [
    {
      name: "Anjali Sharma",
      role: "Product Designer",
      review:
        "Absolutely loved the service! The reminders and WhatsApp integration made my workflow so smooth. Highly recommend!",
      rating: 5,
      image: "/user1.jpg",
    },
    {
      name: "Ravi Kumar",
      role: "Marketing Head",
      review:
        "Very reliable and simple to use. The automated reminders via email are super helpful!",
      rating: 4,
      image: "/user2.jpg",
    },
    {
      name: "Priya Singh",
      role: "Freelancer",
      review:
        "User-friendly, clean, and efficient. I’ve been using it for months without any issues.",
      rating: 5,
      image: "/user3.jpg",
    },
    
  
  ];

  return (
    <section className="relative py-24 px-6 bg-gray-50 overflow-hidden mt-4">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="w-72 h-72 bg-blue-100/40 rounded-full blur-3xl absolute -top-20 -left-20"></div>
        <div className="w-96 h-96 bg-pink-100/30 rounded-full blur-3xl absolute -bottom-24 -right-24"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          Trusted by professionals across industries — hear their stories.
        </p>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200 shadow-sm"
                />
                <h3 className="text-2xl font-semibold text-gray-800">{r.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{r.role}</p>

                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < r.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {r.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
