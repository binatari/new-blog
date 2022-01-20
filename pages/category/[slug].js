import Posts from "../../components/Posts"
import { fetchAPI } from "../../lib/api"
import Layouts from "../../components/Layouts"
import Seo from "../../components/Seo"

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }
console.log(categories)
console.log(category)
  return (
    
    <Layouts categories={categories.data}>
      <Seo seo={seo} />
      <div className="container mx-auto">
        <div className="min-h-screen px-6">
          <h1 className="text-4xl font-bold mt-20 mb-10">{category.attributes.name}</h1>
          <Posts articles={category.attributes.articles.data} />
        </div>
      </div>
  </Layouts>
  )
}

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: "*",
      },
    },
  })
  const allCategories = await fetchAPI("/categories", { populate: '*'})

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  }
}

export default Category
