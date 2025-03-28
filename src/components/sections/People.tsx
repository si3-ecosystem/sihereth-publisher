"use client";
import { useEffect, useRef, useState } from "react";
import apiClient from "@/utils/interceptor";
import Image from "next/image";

interface User {
  _id: number;
  name?: string;
  image?: string;
  domain?: string;
  firstName?: string;
  lastName?: string;
}

const People = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/users");
        const formattedUsers = response.data.map((user: User) => ({
          _id: user._id,
          name: user.name ?? (`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "No Name"),
          image: user.image ?? "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
          domain: user.domain ?? ""
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let animationFrame: number;
    let scrollAmount = 0;
    const scrollSpeed = 0.3;
    const animate = () => {
      if (!scroller) return;
      scrollAmount -= scrollSpeed;
      if (Math.abs(scrollAmount) >= scroller.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scroller.style.transform = `translateX(${scrollAmount}px)`;
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [users]);

  return (
    <div className="overflow-hidden bg-gray-800 py-3 px-4 flex items-center">
      <div className="flex items-center gap-4" ref={scrollerRef} style={{ whiteSpace: "nowrap" }}>
        {users.length > 0 &&
          [...users, ...users].map((user, index) => (
            <div key={`${user._id}-${index}`} className="flex items-center">
              <div className="text-center flex w-max items-center px-3 text-white tracking-wider uppercase">
                <Image
                  src={
                    user.image ?? "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  }
                  alt=""
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="ml-2 mr-4">{user.name}</span>
              </div>
              <div className="bg-white size-3 rounded-full mx-4"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default People;
