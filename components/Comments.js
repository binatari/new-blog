import { ReactCusdis } from 'react-cusdis'
import { useRef } from "react"
const Comments = ({id, name }) => {
    const inputEl = useRef(null);
  return (
    <>
    <ReactCusdis
    
      attrs={{
        host: 'https://cusdis.com',
        appId: '972a3c1c-99d6-4654-9411-341dbf184f7e',
        pageId: `${id}`,
        pageTitle: `${name}`,
      }}
    />

  </>
  )
};

export default Comments;
