import prismaDb from "@/lib/prismadb";
import {auth, currentUser} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function PATCH(
  req: Request,
  {params}: {params: {companionId: string}}
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {name, description, instructions, seed, src, categoryId} = body;

    if (!params.companionId) {
      return new NextResponse("Missing companionId", {status: 400});
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    if (
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !src ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", {status: 400});
    }
    //TODO Check for subscriptions
    const companion = await prismaDb.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_PATCH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {companionId: string}}
) {
  try {
    const {userId} = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    const companion = await prismaDb.companion.delete({
      where: {
        id: params.companionId,
      },
    });
    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
