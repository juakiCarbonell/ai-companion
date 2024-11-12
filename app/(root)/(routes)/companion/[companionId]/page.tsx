import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import {CompanionForm} from "./components/companion-form";

interface Props {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({params}: Props) => {
  const {userId, redirectToSignIn} = auth();
  if(!userId) {
    return redirectToSignIn();
  }

  // Todo: Check subscriptions

  const companion = await prismaDb.companion.findUnique({
    where: {id: params.companionId, userId},
  });

  const categories = await prismaDb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
