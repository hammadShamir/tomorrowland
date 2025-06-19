import React from 'react'
interface IHomepageStatCard {
    number: string;
    label: string
}
const HomepageStatCard: React.FC<IHomepageStatCard> = (props) => {
    return (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">{props.number}</div>
            <div className="text-foreground/70">{props.label}</div>
        </div>
    )
}

export default HomepageStatCard