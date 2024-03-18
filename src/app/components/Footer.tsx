import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full  py-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex flex-row ">
          <Link href="/about">
            <p className="text-sm mr-4 hover:text-sky-600">About</p>
          </Link>
        </div>
        <p className="text-sm">&copy; 2024 Easy-ABC. All rights reserved.</p>
      </div>
    </footer>
  );
};
