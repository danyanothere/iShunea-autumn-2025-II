import { Product } from "@/types";
import queryString from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise <Product[]> => {
    const url=queryString.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
        },
    });

    const response = await fetch (url);
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new SyntaxError(text.slice(0, 200));
    }
    return response.json();
};

export default getProducts;