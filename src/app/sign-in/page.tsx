"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import React from "react";
import toast from "react-hot-toast";
import InputFailed from "../components/InputFailed";
import { Button } from "../components/buttons/Button";
import Link from "next/link";

interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const queryClient = useQueryClient();

  const { mutate: handleComment } = useMutation<void, Error, SignInFormValues>({
    mutationFn: async (values) => {
      const response = await axios.post(`/api/sign-in`, {
        email: values.email,
        password: values.password,
      });
      if (response) {
        toast.success(response.data.message);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleComment(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className=" w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl">Sign In</h1>
            <div className="flex flex-col gap-4">
              <Field name="email" as={InputFailed} placeholder="Email" />
              <Field name="password" as={InputFailed} placeholder="Password" />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              className="w-44 "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In" : "Sign In"}
            </Button>

            <div>
              <Link href="/sign-up">
                Your account does not exist please
                <span className="text-blue-400 font-extrabold">Sign Up</span>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
