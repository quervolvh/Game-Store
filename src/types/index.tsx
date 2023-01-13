export * from "./item";
export * from "./formFieldTypes";

export type cartFunctionType = {
    addToCart: (e: { productId: string, focus: "eCommerce" | "giftCards" | "benefits", index: number }) => void;
    removeItemFromCart: (e: { productId: string }) => void;
    modifyCartItem: (productId: string, action: "increment" | "decrement") => void;
};

export type cartItemType = {

    productId: string,
    count: number,
    index: number,
    focus: "giftCards" | "eCommerce" | "benefits"

};

export type cartType = cartItemType[];
