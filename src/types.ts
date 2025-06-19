import { Dispatch, SetStateAction } from "react";

export interface IMobileMenu {
    isMobileMenu: boolean
    setIsMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}
export interface IMenuLinks {
    title: string;
    url: string;
}
export interface IBanner {
    bgImg: string;
    title: string;
    para: string;
    page: string;
    href: string
}

export interface ICard {
    eventId: number;
    bgImg: string;
    title: string;
    para: string;
    eventDate:Date | null;
}


export interface IReviewCard {
    name: string;
    title: string;
    img: string;
    des: string
}

export interface IFAQs {
    question: string;
    answer: string
}

export interface ConfirmationPopupProps {
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    eventId: number
}

export interface IbidForm {
    eventName: string;
    amount: number;
}

export interface DashboardMenuItem {
    title: string;
    href: string;
    icon: React.ReactNode;
  }