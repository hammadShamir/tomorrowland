"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import TestimonialCard from './TestimonialCard';
import { data } from '@/data';
export default function Slider() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3
                    },
                }}
            >
                {
                    data.reviews.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className='py-10'>
                                <TestimonialCard
                                    name={item.name}
                                    title={item.title}
                                    img={item.img}
                                    des={item.des}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    );
}
