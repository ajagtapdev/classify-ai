/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


const Navbar = () => {
    const pathname = usePathname();
    const renderLink = (name: string, href: string) => (
        <Link key={name} href={href} passHref>
            <span
                className={clsx(
                    "relative flex items-center text-black hover:text-blue-800 transition-colors duration-300 cursor-pointer",
                    { "text-blue-800": pathname === href }
                )}
            >
                <span className="ml-2">{name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 transform origin-left"></span>
            </span>
        </Link>
    );

    return (
        <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-opacity-80 bg-white border-b border-gray-300 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-2 md:px-6 md:py-3">
                <div className="flex items-center justify-between">
                    <Link href="/" passHref>
                        <span className="text-xl font-semibold text-black cursor-pointer text-underline">
                            Classify.ai
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 font-medium text-base">
                    
                    </nav>
                    <div className="flex items-center space-x-2">
                        <Link href="/contact" passHref>
                                <button className="px-4 py-2 text-black rounded hover:text-blue-700 transition duration-300">
                                    Contact
                                </button>
                        </Link>
                        <SignedOut>
                            <Link href="/auth/sign-in" passHref>
                                <button className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700 transition duration-300">
                                    Sign In
                                </button>
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            {renderLink("Classify", "/classifier")}
                            <span className="flex items-center text-black font-medium pl-6">
                                <UserButton />
                            </span>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
