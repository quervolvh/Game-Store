type customerFiltersType = {

    label: string,

    value: string,

    multiSelect?: boolean,

    type?: "option" | "plain" | "date",

    options?: {

        label: string,

        value?: string | boolean | null,

    }[]

}[];

export const customersFilterOptions : customerFiltersType = [

    {
        label: "Organization",
        value: "organization",
        type: "option",
        options: []
    },

    {
        label: "Username",
        value: "username",
        type: "plain",
        options: []
    },

    {
        label: "Email",
        value: "email",
        type: "plain",
        options: []
    },

    {
        label: "Date",
        value: "date",
        type: "date",
        options: []
    },

    {
        label: "Phone Number",
        value: "phone",
        type: "plain",
        options: []
    },

    {
        label: "Status",
        value: "status",
        type: "option",
        options: []
    }

];
