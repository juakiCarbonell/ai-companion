import prismaDb from "@/lib/prismadb";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({params}: ChatIdPageProps) => {
  const {userId, redirectToSignIn} = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismaDb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
