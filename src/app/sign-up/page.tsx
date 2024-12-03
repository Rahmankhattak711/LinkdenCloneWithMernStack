"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Formik, Form, Field} from "formik";
import React from "react";
import toast from "react-hot-toast";
import InputFailed from "../components/InputFailed";
import { Button } from "../components/buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  userImage: string;
  jobTitle: string;
}

export default function SignUp() {
  const router = useRouter()
  const queryClient = useQueryClient();

  const { mutate: handleComment } = useMutation<void, Error, SignUpFormValues>({
    mutationFn: async (values) => {
      await axios.post(`/api/sign-up`, {
        name: values.name,
        email: values.email,
        password: values.password,
        userImage: values.userImage,
        jobTitle: values.jobTitle,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("User Sign Up successfully!");
      router.push("/sign-in")
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          userImage: "",
          jobTitle: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleComment(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className=" w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <Field
                name="name"
                as={InputFailed}
                placeholder="Name"
              />
              <Field
                name="email"
                as={InputFailed}
                placeholder="Email"
              />
              <Field
                name="password"
                as={InputFailed}
                placeholder="Password"
              />
              <Field
                name="userImage"
                as={InputFailed}
                placeholder="User Image"
              />
              <Field
                name="jobTitle"
                as={InputFailed}
                placeholder="Job Title"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              className="w-44 "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up" : "Sign up"}
            </Button>


            <div>
              <Link href="/sign-in">You have an already account please <span className="text-blue-400 font-extrabold">Sign In</span></Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
