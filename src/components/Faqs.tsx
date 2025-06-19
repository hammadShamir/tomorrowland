
import { data } from "@/data"
import Accordion from "./Accordion"

const Faqs = () => {
  return (
    <section id="faqs" className="py-12 md:py-24 relative bg-gradient-to-br from-pink-900/5 via-purple-900/3 to-blue-900/5 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-24 left-16 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-5 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-3xl md:text-4xl font-bold mb-4">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Everything you need to know about our Tomorrowland ticket service
          </p>
        </div>

        <div className="flex-1 flex-col items-center justify-center w-full max-w-4xl mx-auto">
          {
            data.faqs.map((item, index) => {
              return (
                <Accordion key={index} question={item.question} answer={item.answer} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Faqs
