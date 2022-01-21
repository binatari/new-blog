import Images from "../components/Images"
import Layouts from "../components/Layouts"
import { useState } from "react"
import { fetchAPI } from "../lib/api"
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../lib/variants";

const about = ({bio, articles, categories}) => {
  const [text, setText] = useState(false)
  const shorten = (str) =>{
    return str.length >200 ? str.slice(0, 200) + "..." : str
   }
    return (
      <Layouts categories={categories} articles={articles}>
        <main className="container mx-auto min-h-screen flex items-center py-20">
          <div className="flex flex-wrap items-center justify-around h-full">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate"
      viewport={{ once: true }} className=" border border-gray-500 flex flex-col items-center w-4/5 md:w-1/2 px-16 py-10 space-y-6 mb-10 rounded">
              <motion.div variants={fadeIn('down')} className=" relative w-40 h-40 md:h-64 md:w-64 rounded-full overflow-hidden ">
            <Images image={bio.data.attributes.image} />
            </motion.div>
            <motion.h1 variants={fadeIn('down')} className="text-3xl font-semibold">ABOUT ME</motion.h1>
            <motion.p variants={fadeIn('down')} className="text-center">{!text? shorten(bio.data.attributes.Description) : bio.data.attributes.Description}</motion.p>
            <motion.button variants={fadeIn('down')} className="border border-blue-700 py-2 px-4 mr-4 text-blue-700" onClick={()=>setText(!text)}>{!text ? 'Read more':'Read less'}</motion.button>
            </motion.div>
            <div>
              <motion.div variants={fadeIn('down')} initial="initial" animate="animate"
      viewport={{ once: true }} className="border border-gray-500 rounded px-8 md:px-16 pb-8 pt-0 md:pt-8" > 
                <h3 className="text-3xl font-normal py-6">Connect with me</h3>
                <ul className="flex justify-between">
                  <a className="flex h-10 text-center justify-center md:py-0" href='https://instagram.com/itz_efe?utm_medium=copy_link'>
                    <img src={require('../public/images/purple-insta.jpg').default.src} alt="" />
                  </a>
                  <a className="flex h-10 text-center justify-center md:py-0" href="https://www.snapchat.com/add/itz_efe">
                    <img src={require('../public/images/purple-snapchat.jpg').default.src} alt="" />
                  </a>
                  <a className="flex h-10 text-center justify-center md:py-0">
                    <img src={require('../public/images/Twitter.jpg').default.src} alt="" />
                  </a>
                </ul>
                <div className="grid grid-cols-2">

                </div>
              </motion.div>
            </div>
            </div>
        </main>
        </Layouts>
    )
}


export async function getStaticProps({ params }) {
    
    const bio = await fetchAPI("/bio", { populate: "*" })
    const articles = await fetchAPI("/articles", { populate: "*" })
    const categories = await fetchAPI("/categories", { populate: "*" })
    return {
      props: {
       bio,
       articles:articles.data, 
       categories:categories.data
      },
      revalidate: 1,
    }
  }
export default about
