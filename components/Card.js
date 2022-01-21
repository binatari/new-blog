import React from "react"
import Link from "next/link"
import Images from "./Images"
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../lib/variants";

const Card = ({ article, index }) => {
  const shorten = (str) =>{
   return str.length > 150 ? str.slice(0, 150) + "..." : str
  }
  return (
  <div className="flex items-center justify-center py-10 mx-auto w-full md:w-4/5 px-4 md:px-0">
  <motion.div variants={staggerContainer} initial="initial" whileInView="animate"
      viewport={{ once: true }} className='flex flex-wrap justify-between w-full' >
    <motion.div variants={fadeIn('down')} className={`w-full md:w-1/2 py-32 relative ${index % 2 !== 1 && 'md:order-2'}`}>
       <Images image={article.attributes.image} />
    </motion.div> 
    <motion.div variants={fadeIn('down')} className='w-full md:w-2/5 py-6 md:py-16 '>
      <span className='py-4 font-semibold text-xl'>{article.attributes.title}</span>
      <p className='py-8'>{shorten(article.attributes.description)}</p>
      <div className='flex'>
        <Link href={`/article/${article.attributes.slug}`}>
          <a className="border border-[#D43B81] py-2 px-4 mr-4">Read More</a>
        </Link>
        <span className="text-black text-center flex items-center capitalize">{article.attributes.category.data?.attributes.name}</span>
      </div>
    </motion.div>
  </motion.div>
</div>
  )
}



export default Card
