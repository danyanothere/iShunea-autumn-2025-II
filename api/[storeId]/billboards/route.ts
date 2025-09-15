import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request, 
    {params} : {params: Promise<{ storeId: string }>}
) {
  try {
    const { userId } = await auth(); 
    const body = await req.json();
    const { storeId } = await params; // Await params here

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
        return new NextResponse("Image URL is required", { status: 400 });
      }

    if (!storeId) { // Используем resolved storeId вместо params.storeId
        return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403});
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: storeId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
    req: Request, 
    {params} : {params: Promise<{ storeId: string }>}
) {
  try {
    const { storeId } = await params; // Await params here
    
    if (!storeId) {
        return new NextResponse("Store ID is required", { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
     where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}