import { customerType } from "types";

export const customerInformationBlock = ( customer?: customerType ) => [

    {

        title: "Personal Information",
        blocks: [

            {
                title: "FULL NAME",
                value:  customer?.userName ? `${customer?.profile?.firstName || ""} ${customer?.profile?.lastName || ""}` : ""
            },

            {

                title: "PHONE NUMBER",
                value: customer?.phoneNumber

            },

            {

                title: "EMAIL ADDRESS",
                value: customer?.email

            },

            {

                title: "BVN",
                value: customer?.profile?.bvn

            },

            {

                title: "GENDER",
                value: customer?.profile?.gender

            },

            {

                title: "MARITAL STATUS",
                value:  customer?.userName ? "Single" : ""

            },

            {

                title: "CHILDREN",
                value: customer?.userName ? "None" : ""

            },

            {

                title: "TYPE OF RESIDENCE",
                value:  customer?.userName ? "Parents Apartment" : ""

            }

        ]

    },

    {

        title: "Education and Employment",
        blocks: [

            {
                title: "LEVEL OF EDUCATION",
                value: customer?.education?.loanRepayment
            },

            {
                title: "EMPLOYMENT STATUS",
                value: customer?.education?.employmentStatus
            },

            {
                title: "SECTOR OF EMPLOYMENT",
                value: customer?.education?.sector
            },

            {
                title: "DURATION OF EMPLOYMENT",
                value: customer?.education?.duration
            },

            {
                title: "OFFICE EMAIL",
                value: customer?.education?.officeEmail
            },

            {
                title: "MONTHLY INCOME",
                value: `₦${customer?.education?.monthlyIncome?.[0] || ""} - ₦2${customer?.education?.monthlyIncome?.[1] || ""}`
            },

            {
                title: "LOAN REPAYMENT",
                value: customer?.education?.loanRepayment
            }

        ],

    },

    {

        title: "Socials",
        blocks: [

            {
                title: "TWITTER",
                value: customer?.socials?.twitter
            },

            {
                title: "FACEBOOK",
                value: customer?.socials?.facebook
            },

            {
                title: "INSTAGRAM",
                value: customer?.socials?.instagram
            },

        ]

    },

    {

        title: "Guarantor",
        blocks: [

            {
                title: "FULL NAME",
                value:  customer?.userName ? `${customer?.guarantor?.firstName || ""} ${customer?.guarantor?.lastName || ""}` : ""
            },

            {
                title: "PHONE NUMBER",
                value: customer?.guarantor?.phoneNumber
            },

            {
                title: "EMAIL ADDRESS",
                value: customer?.guarantor?.email
            },

            {
                title: "RELATIONSHIP",
                value: customer?.guarantor?.relationship
            }

        ]

    },

    {

        title: "Next Of Kin",
        blocks: [

            {
                title: "FULL NAME",
                value:  customer?.userName ? `${customer?.guarantor?.firstName || ""} ${customer?.guarantor?.lastName || ""}` : ""
            },

            {
                title: "PHONE NUMBER",
                value: customer?.guarantor?.phoneNumber
            },

            {
                title: "EMAIL ADDRESS",
                value: customer?.guarantor?.email
            },

            {
                title: "RELATIONSHIP",
                value: customer?.guarantor?.relationship
            }

        ]

    }

]
