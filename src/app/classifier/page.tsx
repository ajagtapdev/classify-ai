"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { classifyText } from "../actions";
import { PropagateLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const formSchema = z.object({
  textInput: z
    .string()
    .min(1, { message: "Please enter an input" })
    .max(200, { message: "You cannot enter more than 200 characters" })
    .regex(/^[a-zA-Z0-9 ]*$/, { message: "Only alphanumeric characters are allowed." }),
});

export function InputDemo() {
  const { isSignedIn } = useUser(); 
  const router = useRouter(); 

  // Redirect to /sign-in if the user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/auth/sign-in");
    }
  }, [isSignedIn, router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textInput: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState("");

  const onSubmit = async (values: { textInput: string }) => {
    setLoading(true);
    const response = await classifyText(values.textInput.trim());
    setClassification(response as string);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 text-gray-900 flex flex-col items-center">
        <Navbar />
        <div className="pt-96 flex flex-col items-center">
          <PropagateLoader color="#008ae6" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 flex flex-col justify-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full border border-blue-200">
          <h1 className="text-2xl font-semibold text-center mb-6 text-blue-700">Enter your text</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="textInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700">Input Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type here..."
                        {...field}
                        className="border border-blue-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Classify
              </Button>
              {classification && <h2 className="text-2xl text-center">{classification}</h2>}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default InputDemo;
