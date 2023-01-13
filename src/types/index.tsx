export * from "./item";
export * from "./formFieldTypes";

export type cartFunctionType = {
    addToCart: (productId: string) => void;
    removeItemFromCart: (productId: string) => void;
    modifyCartItem: (productId: string, action: "increment" | "decrement") => void;
};

export type cartType = {

    productId: string,
    count: number

}[]
