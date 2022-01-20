import Images from "../components/Images"
import Layouts from "../components/Layouts"
import { useState } from "react"
import { fetchAPI } from "../lib/api"
const about = ({bio, articles, categories}) => {
  const [text, setText] = useState(false)
  const shorten = (str) =>{
    return str.length >200 ? str.slice(0, 200) + "..." : str
   }
    return (
      <Layouts categories={categories} articles={articles}>
        <main className="container mx-auto min-h-screen flex items-center py-20">
          <div className="flex flex-wrap items-center justify-around h-full">
            <div className=" border border-gray-500 flex flex-col items-center w-4/5 md:w-1/2 px-16 py-10 space-y-6 mb-10 rounded">
              <div className=" relative h-64 w-64 rounded-full overflow-hidden ">
            <Images image={bio.data.attributes.image} />
            </div>
            <h1 className="text-3xl font-semibold">ABOUT ME</h1>
            <p>{!text? shorten(bio.data.attributes.Description) : bio.data.attributes.Description}</p>
            <button className="border border-blue-700 py-2 px-4 mr-4 text-blue-700" onClick={()=>setText(!text)}>{!text ? 'Read more':'Read less'}</button>
            </div>
            <div>
              <div className="border border-gray-500 rounded px-16 py-8" > 
                <h3 className="text-3xl font-normal py-6">Connect with me</h3>
                <ul className="flex justify-around">
                  <a className="flex h-10 mr-4 text-center justify-center md:py-0">
                    <img src={require('../public/images/purple-insta.svg').default.src} alt="" />
                  </a>
                  <a className="flex h-10 mr-4 text-center justify-center md:py-0">
                    <img src={require('../public/images/purple-snapchat.svg').default.src} alt="" />
                  </a>
                  <a className="flex h-10 mr-4 text-center justify-center md:py-0">
                    <img src={require('../public/images/Twitter.svg').default.src} alt="" />
                  </a>
                </ul>
                <div className="grid grid-cols-2">

                </div>
              </div>
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
