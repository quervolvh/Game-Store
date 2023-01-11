export type objectOptionType = {
    link?: string,
    externalLink?: string,
    label: string,
    value: string,
    onClick?: () => void,
    options?: { label: string, value: string }[]
};
