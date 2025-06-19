import Slider from "./Slider"

const Reviews = () => {
    return (
        <section id="review" className="py-12 md:py-24 relative bg-gradient-to-br from-blue-900/5 via-purple-900/3 to-pink-900/5 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-15 animate-pulse delay-700"></div>
            
            <div className="w-full max-w-7xl px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl md:text-4xl font-bold mb-4">
                        💬 What Our Customers Say
                    </h2>
                    <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                        Real experiences from festival-goers who secured their tickets through us
                    </p>
                </div>
                <div>
                    <Slider />
                </div>
            </div>
        </section>
    )
}

export default Reviews
