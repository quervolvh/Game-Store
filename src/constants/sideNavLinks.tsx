import {
    BalanceIcon, ComputerIcon, FavoriteIcon, HeadPhonesIcon, KeyboardIcon,
    MouseGamingIcon, ProfileIcon, SearchIcon, VrGlassesIcon
} from "components";

type sideNavBlockItemType = {
    title?: string,
    link?: string,
    type?: "dashboard" | "side-nav-item-block",
    links: {
        title: string,
        icon: string,
        link: string,
    }[]
};


const categoriesBlock: sideNavBlockItemType = {

    title: "Category",

    link: "/",

    type: "side-nav-item-block",

    links: [

        {
            title: "Computer",
            icon: ComputerIcon,
            link: "/"

        },

        {
            title: "Game Headphones",
            icon: HeadPhonesIcon,
            link: "/"

        },

        {
            title: "VR Glasses",
            icon: VrGlassesIcon,
            link: "/"

        },

        {
            title: "Keyboard",
            icon: KeyboardIcon,
            link: "/"

        },

        {
            title: "Mouse Gaming",
            icon: MouseGamingIcon,
            link: "/"

        },

    ]

}

const profileBlock: sideNavBlockItemType = {

    title: "",

    link: "/",

    type: "side-nav-item-block",

    links: [

        {
            title: "Profile",
            icon: ProfileIcon,
            link: "/"

        },

        {
            title: "Search",
            icon: SearchIcon,
            link: "/"

        },

        {
            title: "Favorite",
            icon: FavoriteIcon,
            link: "/"

        },

        {
            title: "Balance",
            icon: BalanceIcon,
            link: "/"

        },

    ]

};


export const SIDENAVLINKS: sideNavBlockItemType[] = [

    profileBlock,

    categoriesBlock,

];
