"use client";
import { useEffect, useRef, useState } from "react";
import apiClient from "@/utils/interceptor";
import Image from "next/image";

interface User {
  _id: number;
  fullName?: string;
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
          fullName: user.fullName,
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
    const scrollSpeed = 1;
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

  if (users.length === 0) return null;

  return (
    <div className="overflow-hidden bg-gray-900 py-3 px-4 flex items-center">
      <div className="flex items-center font-sora gap-4" ref={scrollerRef} style={{ whiteSpace: "nowrap" }}>
        {[...users, ...users, ...users].map((user, index) => (
          <div key={`${user._id}-${index}`} className="flex items-center">
            <div className="text-center flex w-max items-center px-3 text-white tracking-wider uppercase">
              <div className="size-12 relative">
                <Image
                  src={
                    user.image ?? "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  }
                  fill
                  alt=""
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="mx-4 text-left text-sm">
                <p>{user.fullName ?? ""}</p>
                <a
                  href={`https://${user.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lowercase hover:underline underline-offset-2"
                >
                  {user.domain ?? ""}
                </a>
              </div>
            </div>
            <div className="bg-white size-2 rounded-full mx-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
