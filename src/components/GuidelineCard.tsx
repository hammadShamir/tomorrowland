import React from 'react'
interface IGuidLineCard {
    icon: React.ReactNode;
    title: string;
    description: string
}
const GuidelineCard:React.FC<IGuidLineCard> = (props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-primary/20">
            <div className="flex items-center mb-4">
                {props.icon}
                <h3 className="text-xl font-semibold ml-3 text-foreground">{props.title}</h3>
            </div>
            <p className="text-foreground/70">{props.description}</p>
        </div>
    )
}

export default GuidelineCard
