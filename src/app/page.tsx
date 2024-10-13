'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, Clipboard, Headset } from "lucide-react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { SignedOut, SignedIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Section */}
          <section className="py-20 text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">Welcome to Classify.ai</h2>
            <p className="text-xl mb-8 text-gray-600">
              A trusted partner in AI-driven data classification for government entities.
            </p>
            <SignedOut>
            <Button 
              asChild 
              className="bg-blue-700 hover:bg-blue-900 text-white transition-transform transform hover:scale-105"
            >
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
            </SignedOut>
            <SignedIn>
            <Button 
              asChild 
              className="bg-blue-700 hover:bg-blue-900 text-white transition-transform transform hover:scale-105">
              <Link href="/classifier">Search</Link>
              </Button>
            </SignedIn>
          </section>

          {/* Features Section */}
          <section className="py-16 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature Card 1 */}
              <Card className="transition-transform transform hover:scale-105 hover:shadow-lg bg-white text-gray-900 border border-gray-200">
                <CardHeader>
                  <Shield className="w-10 h-10 text-blue-700 mb-2" />
                  <CardTitle>Secure and Reliable</CardTitle>
                  <CardDescription>
                    Built with government-grade security protocols
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Ensure the safety and integrity of classified data through our advanced AI solutions.
                  </p>
                </CardContent>
              </Card>

              {/* Feature Card 2 */}
              <Card className="transition-transform transform hover:scale-105 hover:shadow-lg bg-white text-gray-900 border border-gray-200">
                <CardHeader>
                  <Clipboard className="w-10 h-10 text-blue-700 mb-2" />
                  <CardTitle>Efficient Classification</CardTitle>
                  <CardDescription>
                    Streamlined processes for quick and accurate results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Optimize your data management with state-of-the-art AI classification tools.
                  </p>
                </CardContent>
              </Card>

              {/* Feature Card 3 */}
              <Card className="transition-transform transform hover:scale-105 hover:shadow-lg bg-white text-gray-900 border border-gray-200">
                <CardHeader>
                  <Headset className="w-10 h-10 text-blue-700 mb-2" />
                  <CardTitle>24/7 Support</CardTitle>
                  <CardDescription>
                    Dedicated customer support for government agencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Our experienced team is available around the clock to assist with your needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">
              Empower Your Agency with AI-Driven Solutions
            </h2>
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white transition-transform transform hover:scale-105"
            >
              Contact Us
            </Button>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-gray-500 bg-gray-100 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; 2024 Team LiquidDeath</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
