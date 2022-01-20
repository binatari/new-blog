import Footer from "./Footer"
import Navbar from "./Navbar"

const Layouts = ({ children, categories, seo, articles }) => (
  <>
    <Navbar categories={categories} articles={articles}/>
    {children}
    <Footer/>
  </>
)

export default Layouts
