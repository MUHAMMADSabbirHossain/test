"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  loginUserSchema,
  LoginUserSchemaTypes,
} from "@/schemas/authentication/login/loginUserSchema";

const FormSchema = loginUserSchema;

function UserLoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: LoginUserSchemaTypes) {
    try {
      console.log(formData);
      const test = axios.post("/api/v1/auth/login/owner", {
        userRoleName: "OWNER",
        ...formData,
      });

      toast.promise(test, {
        loading: "Loading...",
        success: (data) => {
          console.log(data);

          if (data.status !== 200 && !data.data.token && !data.data.user.id) {
            return "Error: " + data.data.message;
          }
          return `Logged in as ${data.data.user.email}.`;
        },
        error: (error) => {
          console.log(error);
          return `Error: ${error}`;
        },
        position: "top-center",
        richColors: true,
        duration: 5000,
      });
    } catch (error) {
      console.log(`Error: ${error}` || error);

      toast.error(`Error: ${error}`, {
        description: `Error: ${error}`,
        position: "top-center",
        richColors: true,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-8 flex flex-col justify-center items-center mx-auto min-h-screen"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display email.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                {/* <FormDescription>
                  This is your public display password.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default UserLoginForm;
