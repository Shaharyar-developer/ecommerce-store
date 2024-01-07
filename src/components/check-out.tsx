import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { CountrySelector } from "@/components/ui/country-selector";
import { Input } from "@/components/ui/input";

import { countries } from "@/lib/countries.min";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CitySelector } from "./ui/city-selector";

import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
export function CheckOut({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const { clearCart } = useCart();
  const [country, setCountry] = useState<string>("Pakistan");
  const [city, setCity] = useState<string>("");
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const formSchema = z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email("Invalid Email"),
    phone: z.string().regex(phoneRegex, "Invalid Number!"),
    country: z.string().min(2, "Too Short!"),
    city: z.string().min(2, "Required Field"),
    address: z.string().min(2, "Too Short!"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "+",
      country: country,
      city: city,
      address: "",
    },
  });
  const { watch } = form;
  const watchedCountry = watch("country");
  const watchedCity = watch("city");
  useEffect(() => {
    setCountry(watchedCountry);
    setCity(watchedCity);
  }, [watchedCountry, watchedCity]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    closeModal();
    clearCart();
    toast.success(
      <div className="flex flex-col">
        <p className="underline">You Submitted</p>
        <pre>
          <code lang="json" className="text-xs text-ellipsis">
            {JSON.stringify(
              { ...values, address: values.address.substring(0, 25) + "..." },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delivery Details</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your delivery details.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="+923131313313"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="country"
              rules={{ required: "Country is required" }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>
                    {error ? (
                      <p className="text-destructive">Country</p>
                    ) : (
                      "Country"
                    )}
                  </FormLabel>
                  <FormControl>
                    <>
                      <CountrySelector
                        defaultCountry={country}
                        setCountry={onChange}
                        countries={countries}
                      />
                      {error && (
                        <p className="text-destructive font-normal">
                          {error.message}
                        </p>
                      )}
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="city"
              rules={{ required: "City is required" }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>
                    {error ? <p className="text-destructive">City</p> : "City"}
                  </FormLabel>
                  <FormControl>
                    <>
                      <CitySelector
                        setCity={onChange}
                        country={watchedCountry}
                      />
                      {error && (
                        <p className="text-destructive font-normal">
                          {error.message}
                        </p>
                      )}
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Submit</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
