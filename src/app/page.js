"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { ToastAction } from "@/components/ui/toast";
const FormSchema = z.object({
  orderNum: z.string().min(1, {
    message: "required",
  }),
  token: z.string().min(1, {
    message: "required",
  }),
});

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderNum: "",
      token: "",
    },
  });

  async function checkDeliveryStatus(orderNum, token) {
    const response = await axios.post("/api/deliveryStatus", {
      orderNum,
      token,
    });
    return response.data.message;
  }

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const message = await checkDeliveryStatus(data.orderNum, data.token);
      setIsLoading(false);
      toast({
        title: "Delivery Window",
        description: message,
        action: <ToastAction altText="确定">OK</ToastAction>,
        duration: 120000,
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "invalid order number or token",
      });
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen max-h-screen overflow-y-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Tesla Delivery Window</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w space-y-6"
            >
              <FormField
                control={form.control}
                name="orderNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Number</FormLabel>
                    <FormControl>
                      <Input placeholder="RN809000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Token</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      iPhone 下载 Auth for Tesla 获取，安卓自行搜索相关 app。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : "Submit"}
              </Button>
            </form>
          </Form>{" "}
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
