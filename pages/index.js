import React from "react"
import Posts from "../components/Posts"
import Carousel from "../components/Carousel"
import Layouts from "../components/Layouts"
import Seo from "../components/Seo"
import axios from "axios"
import Pagination from "@material-ui/lab/Pagination"
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../lib/variants";
import { useState } from "react"
import { useQuery } from "react-query"
import { fetchAPI, getStrapiURL } from "../lib/api"


const Home = ({ articles, categories, homepage, pagination, pageCount }) => {
  const url = getStrapiURL('/api/articles')
  
  const [page, setPage] = useState(1);
  const { isLoading, isError, isSuccess, data, refetch, isFetching } = useQuery(["post", page], getPosts, {
    placeholderData:pagination,
    keepPreviousData:true,
    enabled: !!page,
  });

  async function getPosts() {
    const request = await axios.get(`${url}?populate=%2A&pagination[page]=${page}&pagination[pageSize]=2`)
    return request.data
  }

  function handlePaginationChange(e, value) {
    setPage(value);
  }

  return (
    <Layouts categories={categories} articles={articles}>
      <Seo seo={homepage.attributes.seo} />
      <div className="container mx-auto pt-6">
      <div className="h-screen">
        <motion.div variants={fadeIn('down')} initial="initial" whileInView="animate"
      viewport={{ once: true }} className="h-full flex">
          <div className=" h-[70%] w-[10%] hidden md:flex flex-col items-center justify-center left-[5%] z-50 relative">
            <div className="prev cursor-pointer h-10 w-10 mb-1 p-2 rounded-full bg-white">
              <img src={require('../public/images/leftft.svg').default.src}  className="h-full w-full" alt="" />
            </div>
            <div className="next cursor-pointer h-10 w-10 mt-1 p-2 rounded-full bg-[#D43B81]">
            <img src={require('../public/images/right.svg').default.src}  className="h-full w-full" alt="" />
            </div>
          </div>
          <Carousel articles={articles}/>
          <div className=" h-[70%] w-[5%] hidden md:flex flex-col items-center justify-center z-50 relative">
            <a className=" cursor-pointer h-10 w-10 mb-6  p-2 rounded-full bg-white hover:scale-125 transition-all"  href='https://instagram.com/itz_efe?utm_medium=copy_link'>
              <img src={require('../public/images/insta-pink.png').default.src}   className="h-full w-full" alt="" />
            </a>
            <a className="cursor-pointer h-10 w-10 mb-6  p-2 rounded-full hover:scale-125 transition-all">
            <img src={require('../public/images/twitter-pink.png').default.src}  className="h-full w-full" alt="" />
            </a>
            <a className="cursor-pointer h-10 w-10  p-2 rounded-full hover:scale-125 transition-all" href="https://www.snapchat.com/add/itz_efe">
            <img src={require('../public/images/snapchat-pink.png').default.src}  className="h-full w-full" alt="" />
            </a>
          </div>
        </motion.div>
      </div>
      {
        data && <Posts articles={data.data}/>
      }
      <Pagination
        count={pageCount.pagination.pageCount}
        variant='outlined'
        shape="rounded"
        className='mx-auto w-full justify-center flex  py-16'
        page={page}
        onChange={handlePaginationChange}
      />
      </div>
    </Layouts>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, categoriesRes, homepageRes, pagination] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
    fetchAPI("/articles", { populate: "*", 'pagination[page]': '1', 'pagination[pageSize]':'2' }),
  ])

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
      pagination: pagination,
      pageCount: pagination.meta
    },
    revalidate: 1,
  }
}

export default Home
