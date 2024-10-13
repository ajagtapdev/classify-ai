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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs"; 
import { useRouter } from "next/navigation"; 

// Define the form schema using Zod
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

  const { reset } = form; // Use the reset function from react-hook-form
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState("");
  const [examples, setExamples] = useState<string[]>([]); // Specify the type for examples

  // Handle form submission
  const onSubmit = async (values: { textInput: string }) => {
    setLoading(true);
    const response = await classifyText(values.textInput.trim());
    setClassification(response.response as string);
    setExamples(response.examples.split('\n') as []);
    setLoading(false);
  };

  // Show loading spinner while processing
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

  // If classification is available, show results
  if (classification) {
    return (
      <div className="min-h-screen bg-blue-50 text-gray-900 flex flex-col justify-center">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full border border-blue-200 flex flex-col items-center space-y-4">
            <h2 className="text-2xl text-center pt-4">{classification}</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-fit bg-transparent text-black hover:bg-transparent shadow-none transition-colors text-sm underline-offset-4 underline font-semibold">View Reasoning</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[650px] bg-white text-black">
                <DialogHeader>
                  <DialogTitle>View Reasoning</DialogTitle>
                  <DialogDescription className="bg-white">
                    Check out the sample data that inspired our decision
                  </DialogDescription>
                </DialogHeader>
                {examples.map((example, index) => (
                  <h2 key={index} className="text-md">{example}</h2>
                ))}
              </DialogContent>
            </Dialog>
            <Button
              type="button" // Change type to button to prevent form submission
              className="w-fit bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg"
              onClick={() => {
                reset(); // Reset the form fields
                setClassification(""); // Clear the classification
                setExamples([]); // Clear the examples
              }}
            >
              Re-classify
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render the input form if no classification exists
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
                        {...field}
                        className="border border-blue-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-4 justify-center items-center">
                <Button
                  type="submit"
                  className="w-fit bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg"
                >
                  Classify
                </Button>
              </div>
              {classification && <h2 className="text-2xl text-center pt-4">{classification}</h2>}
              <div className="flex flex-col space-y-4 justify-center items-center">
                {classification && <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-fit bg-transparent text-black hover:bg-transparent shadow-none transition-colors text-sm underline-offset-4 underline font-semibold">View Reasoning</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white text-black">
                    <DialogHeader>
                      <DialogTitle>View Reasoning</DialogTitle>
                      <DialogDescription className="bg-white">
                        Sample data that inspired our decision
                      </DialogDescription>
                    </DialogHeader>
                    {examples.map((example, index) => (
                      <h2 key={index} className="text-sm">{example}</h2>
                    ))}
                  </DialogContent>
                </Dialog>}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default InputDemo;
