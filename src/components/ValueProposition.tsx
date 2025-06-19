"use client";

import React from 'react';
import { FaRocket, FaClock, FaCheckCircle } from 'react-icons/fa';

const ValueProposition = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-pulse delay-300"></div>
      
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-6">
            How We Get You <span className="text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">Tomorrowland Tickets</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Instead of fighting thousands of fans in the official queue, we use our advance booking technology 
            to secure your priority access before tickets go public.
          </p>
        </div>

        {/* Three Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaRocket className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">Skip the Queue</h3>
            <p className="text-foreground/70 leading-relaxed">
              Our system uses thousands of pre-registered accounts to bypass the official Tomorrowland queues 
              and secure your purchase link first. 🎵
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-pink-50 border border-pink-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaClock className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-pink-600 transition-colors">⚡ Instant Delivery</h3>
            <p className="text-foreground/70 leading-relaxed">
              Receive your exclusive purchase link via email and WhatsApp within minutes of tickets going on sale. 
              You have 10 minutes to complete your purchase.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaCheckCircle className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">🔒 Secure & Reliable</h3>
            <p className="text-foreground/70 leading-relaxed">
              Trusted by 500+ customers worldwide. All payments secured through PayPal, 
              and tickets are personalized in your name.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-12">
            🎉 Simple 3-Step Process
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center !text-white font-bold shrink-0 text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3 text-lg group-hover:text-purple-600 transition-colors">📝 Register Your Details</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Select your Tomorrowland event and provide your contact information. 
                  We register you in our priority system.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center !text-white font-bold shrink-0 text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3 text-lg group-hover:text-pink-600 transition-colors">🚀 We Secure Your Link</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  On sale day, our technology bypasses the queue and sends you 
                  an exclusive purchase link via email and WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center !text-white font-bold shrink-0 text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3 text-lg group-hover:text-blue-600 transition-colors">🎫 Complete Your Purchase</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Use your exclusive link to buy tickets directly from Tomorrowland. 
                  Pay €100 service fee to personalize tickets in your name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;