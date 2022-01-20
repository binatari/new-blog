import React, { useState } from "react"
import Link from 'next/link'
import Images from "./Images"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

//import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs])

export default function Carousel({ articles }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="h-full w-full md:w-4/5">
      <Swiper
        spaceBetween={10}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2 h-[70%] w-full"
      >
        {articles.map((article, i) => {
          return (
            <SwiperSlide>
              <Images image={article.attributes.image} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={1}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper min-h-[20%] w-60 md:w-80 bottom-24 bg-white shadow-sm shadow-black rounded"
      >
        {articles.map((article, i) => {
          return (
            <SwiperSlide className="flex items-center justify-center py-4 px-6 h-full self-center">
              <div className="flex flex-col items-center justify-center">
                <p id="category" className="py-4 text-black text-center capitalize">
                {console.log(article.attributes.category.data?.attributes.name)}
                  {article.attributes.category.data?.attributes.name}
                </p>
                <p id="title" className="py-4 text-center font-semibold text-xl">
                  {article.attributes.title}
                </p>
                <Link href={`/article/${article.attributes.slug}`}>
                    <a className="border border-blue-700 py-2 px-4">Read More</a>
                </Link>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
