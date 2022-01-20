import App from "next/app"
import Head from "next/head"

import "swiper/css/bundle";
import "../assets/css/globals.css"
import { createContext } from "react"
import { fetchAPI } from "../lib/api"
import { getStrapiMedia } from "../lib/media"
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3, 
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  }
}
const queryClient = new QueryClient(queryClientConfig)
// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        </QueryClientProvider>
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}

export default MyApp
