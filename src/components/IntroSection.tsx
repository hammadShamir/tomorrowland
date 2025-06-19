import Image from 'next/image'
import { data } from '../data'
import Link from 'next/link'

const IntroSection = () => {
  const { title, description, stats, images, buttonText, buttonUrl } = data.introContent;

  return (
    <section id='about' className="py-12 md:py-24 relative overflow-hidden">
      {/* Background gradient overlay for party effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10 pointer-events-none"></div>
      
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto relative z-10">
        <div className="w-full justify-start items-center gap-8 md:gap-16 grid lg:grid-cols-2 grid-cols-1">
          
          {/* Images Section - Cool Party Layout */}
          <div className="w-full justify-center items-center gap-4 md:gap-6 grid grid-cols-1 lg:order-first order-last">
            
            {/* Main Featured Image - Large 16:9 */}
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="aspect-video w-full relative">
                <Image
                  className="w-full h-full object-cover"
                  src={images[0].src}
                  alt={images[0].alt || 'Tomorrowland Festival Main Stage'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay gradient for party effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {/* Floating party elements */}
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">🎵 Main Stage</span>
                </div>
              </div>
            </div>

            {/* Secondary Image - Smaller 16:9 with cool effects */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl transform hover:scale-105 transition-all duration-500">
              <div className="aspect-video w-full relative">
                <Image
                  className="w-full h-full object-cover"
                  src={images[1].src}
                  alt={images[1].alt || 'Tomorrowland Festival Crowd Party'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay with party vibe */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20"></div>
                {/* Floating party badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-xs font-bold">
                  🎉 LIVE
                </div>
              </div>
            </div>

            {/* Decorative elements for party atmosphere */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50 animate-pulse delay-300"></div>
          </div>

          {/* Content Section */}
          <div className="w-full flex-col justify-center lg:items-start items-center gap-6 md:gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-4 md:gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 className="text-secondary text-3xl md:text-4xl font-bold font-[family-name:var(--font-primary)] leading-normal lg:text-start text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </h2>
                <p className="text-foreground/70 text-base font-normal leading-relaxed lg:text-start text-center">
                  {description}
                </p>
              </div>
              
              {/* Stats with party-themed styling */}
              <div className="w-full lg:justify-start justify-center items-center sm:gap-8 md:gap-12 gap-6 inline-flex">
                {stats.map((stat, index) => (
                  <div key={index} className="flex-col justify-center md:justify-start items-center md:items-start inline-flex gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl md:text-4xl font-bold font-[family-name:var(--font-primary)] leading-normal text-center">
                      {stat.value}
                    </h3>
                    <h6 className="text-foreground/70 text-sm md:text-base text-center md:text-start font-medium leading-relaxed">
                      {stat.label}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Button with party styling */}
            <Link href={buttonUrl}>
              <button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 !text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                <span className="relative z-10 !text-white">{buttonText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
