"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { useAdminId } from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/Zustand/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { FormControl, FormField, FormItem } from "../ui/form";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "../ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";
import ShareLink from "./ShareLink";

const formSchema = z.object({
  email: z.string().email("Please enter a vaild email address"),
});

export default function InviteUser({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [openInviteLink, setOpenInviteLink] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;

    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite...",
    });

    // We need to get the users current chats to check if they about to exceed the PRO plan
    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }

    const findUserEmail = await getDocs(getUserByEmailRef(values.email));

    if (findUserEmail.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email addresss of a registered user OR resend the invitation once they have signed up!",
        variant: "destructive",
      });
      return;
    } else {
      const user = findUserEmail.docs[0].data();

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      })
        .then(() => {
          setOpen(false);
          toast({
            title: "Added to chat",
            description: "The user has been added to the chat successfully!",
            className: "bg-green-600 text-white",
            duration: 3000,
          });
          setOpenInviteLink(true);
        })
        .catch(() => {
          toast({
            title: "ERROR",
            description:
              "Whoops... there was an error adding the user to the chat",
            variant: "destructive",
          });

          setOpen(false);
        });
    }

    form.reset();
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this
                chat!{" "}
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>

            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="cool@cool.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Chat
                </Button>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
}
