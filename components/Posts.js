import React from "react"
import Card from "./Card"

const Posts = ({ articles }) => {
 
  return (
    <div>
     {
       articles.map((article, i)=> (
           <Card article={article} index={i}/>
         ))
     }
    </div>
  )
}

export default Posts


