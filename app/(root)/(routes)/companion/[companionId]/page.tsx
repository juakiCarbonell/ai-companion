import prismaDb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";

interface Props {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({params}: Props) => {
  // Todo: Check subscriptions

  const companion = await prismaDb.companion.findUnique({
    where: {id: params.companionId},
  });

  const categories = await prismaDb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
