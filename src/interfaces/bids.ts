export interface ICustomer {
    nickName: string;
}

export interface IEventInstance {
    eventDate: string;
    startTime: string;
    endTime: string;
    amount: number;
    event: {
        title: string;
        description: string;
        bgImg: string;
    };
}

export interface IBidData {
    amount: number;
    status: string;
    createAt: string;
    updatedAt: string;
    customer: ICustomer;
    eventInstance: IEventInstance;
}
