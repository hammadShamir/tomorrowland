export interface EventInstance {
    id: number;
    eventId: number;
    startTime: string | null;
    endTime: string | null;
    eventDate: string;
    amount: string;
}

export interface IEvents {
    createAt: Date
    description: string
    eventDateTime: Date
    id: number
    title: string
    bgImg: string
    updatedAt: Date
    amount?: number
    status?: string
    eventInstances?: EventInstance[]
}

export interface AddEventsModal {
    isOpen: boolean
    onClose: () => void
}

export interface EditEvent {
    isOpen: boolean
    events: IEvents | undefined
    onClose: () => void
}
export interface DeleteEventModal {
    id: number
    isOpen: boolean
    onClose: () => void
}

export interface CreateInstanceConfirmationModal {
    eventId: number
    isOpen: boolean
    onClose: () => void
    onConfirm: (eventId: number) => Promise<void>
}