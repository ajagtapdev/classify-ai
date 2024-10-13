"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const formSchema = z.object({
  textInput: z
    .string()
    .min(1, { message: "Please enter an input" })
    .max(200, { message: "You cannot enter more than 200 characters" })
});

// Define the component as a default export
const Page = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

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

  const { reset } = form;
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState("");
  const [examples, setExamples] = useState<string[]>([]);

  const onSubmit = async (values: { textInput: string }) => {
    setLoading(true);
    const response = await classifyText(values.textInput.trim());
    setClassification(response.response as string);
    setExamples(response.examples.split('\n') as []);
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
                    Check out the simulated classified data that inspired our decision.
                  </DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Text</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examples.map((example, index) => {
                      const splitExample = example.split(' (');
                      const text = splitExample[0];
                      const classification = splitExample[1].split(')')[0];
                      return (
                        <TableRow key={index}>
                          <TableCell>{text}</TableCell>
                          <TableCell>{classification}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
            <Button
              type="button"
              className="w-fit bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg"
              onClick={() => {
                reset();
                setClassification("");
                setExamples([]);
              }}
            >
              Re-classify
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 flex flex-col justify-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full border border-blue-200">
          <h1 className="text-2xl font-semibold text-center mb-6 text-black">Enter Your Content</h1>
          <p className="text-sm text-slate-500 my-6 text-center">We utilize cutting-edge AI techniques to find simulated classified data similar to your input to make an informed classification decision.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="textInput"
                render={({ field }) => (
                  <FormItem>
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
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

// Use default export to match Next.js page requirements
export default Page;
