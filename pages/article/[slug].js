import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layouts from "../../components/Layouts"
import Images from "../../components/Images"
import Seo from "../../components/Seo"

import { getStrapiMedia } from "../../lib/media"
import Comments from "../../components/Comments"

const Article = ({ article, categories, allArticles }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  

  return (
    <Layouts categories={categories.data} articles={allArticles}>
      <Seo seo={seo} />
      <div className="container mx-auto">
        <ul className="flex mx-auto w-[90%] px-2 md:px-4 md:w-4/5 justify-between items-center pt-4 border-t border-black my-10">
          <li><Moment format="Do MMMM, YYYY" date={article.attributes.createdAt}/></li>
          <li className="capitalize text-center">{article.attributes.category.data.attributes.name}</li>
          <li className="text-center">by {article.attributes.author.data.attributes.name}</li>
        </ul>
        <h1 className="text-center mx-auto py-8 font-semibold text-xl">{article.attributes.title}</h1>
        <div className="w-4/5 h-[27rem] mx-auto">
        <img src={imageUrl} alt="" className="w-full h-full object-cover object-center" />
        </div>
      <div className="w-full">
        <div className="w-4/5 mx-auto  py-12">
          <ReactMarkdown
            source={article.attributes.content}
            escapeHtml={false}
          />
        </div>
      </div>
      <div className="w-4/5 mx-auto">
        <h3 className="text-3xl font-bold py-16">Comments</h3>
        <Comments id={article.attributes.slug} name={article.attributes.title}/>
      </div>
      <div className="py-24">

      </div>
      </div>
    </Layouts>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories", {populate: "*" })
  const articles = await fetchAPI("/articles", { populate: "*" })
  return {
    props: { article: articlesRes.data[0], categories: categoriesRes, allArticles:articles.data },
    revalidate: 1,
  }
}

export default Article
