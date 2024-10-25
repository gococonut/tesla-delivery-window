"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [showFollowButton, setShowFollowButton] = useState(false);
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
      setShowFollowButton(true);
      toast({
        title: "Delivery Window",
        description: message,
        action: <ToastAction altText="确定">OK</ToastAction>,
        duration: 120000,
      });
    } catch (error) {
      setShowFollowButton(false);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "invalid order number or token",
      });
    }
    setShowFollowButton(true);
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
              className="w space-y-6 text-md"
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
                {isLoading ? "Processing..." : "Submit"}
              </Button>
              {showFollowButton && (
                <div className="mt-4 flex items-center text-zinc-800">
                  <p className="text-[0.8rem]">
                    如果缓解了您的等车焦虑，赏个关注
                  </p>
                  <Button
                    className="text-[0.8rem] text-rose-500"
                    variant="link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href =
                        "https://www.xiaohongshu.com/user/profile/5c3bfa7c00000000060304c5?xhsshare=CopyLink&appuid=5c3bfa7c00000000060304c5&apptime=1729843629&share_id=86e3c52a12af450f88502629c40d1799";
                    }}
                  >
                    @信都人
                  </Button>
                </div>
              )}
            </form>
          </Form>{" "}
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
