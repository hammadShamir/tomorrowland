import React from 'react'
interface IStatCard {
    value: string;
    label: string;
    title?: string;
    icon?: React.ReactNode;
    trend?: string;
}

const StatCard: React.FC<IStatCard> = ({ value, label, title, icon, trend }) => {
    return (
        <div className="text-center p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 hover:shadow-purple-300/50 transition-all duration-300 transform hover:scale-105">
            {icon && (
                <div className="text-3xl mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                        {icon}
                    </div>
                </div>
            )}
            {title && <div className="text-lg font-bold text-foreground mb-3 font-serif">{title}</div>}
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2 font-serif">{value}</div>
            <div className="text-foreground/70 mb-3 font-sans font-medium">{label}</div>
            {trend && <div className="text-sm text-purple-600 font-sans bg-purple-50 px-3 py-1 rounded-full inline-block">{trend}</div>}
        </div>
    );
}

export default StatCard
