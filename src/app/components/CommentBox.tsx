"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./buttons/Button";
import InputFailed from "./InputFailed";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import React from "react";
import toast from "react-hot-toast";

interface CommentFormValues {
  comment: string;
}

export default function CommentBox() {
  const queryClient = useQueryClient();

  const { mutate: handleComment } = useMutation<void, Error, CommentFormValues>(
    {
      mutationFn: async (values) => {
        await axios.post(`/api/comment`, { comment: values.comment });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Comment created successfully!");
      },
    }
  );

  return (
    <div className="w-full">
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={(values, { resetForm }) => {
          handleComment(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex gap-4">
            <div className="flex-1">
              <Field
                name="comment"
                as={InputFailed}
                placeholder="Write a comment what's on your mind..."
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
