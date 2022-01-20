import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Autocomplete = (articles) => {
    const {articles:datas} = articles

      const searchList = datas?.map((data, i)=>{
          return {
              id:i,
              content:data.attributes.content,
              title:data.attributes.title,
              description:data.attributes.description
          }
      })
    return (
        <>
           <ReactSearchAutocomplete
            items={searchList}
            placeholder={'Search...'}
            styling={
                {
                    border:'none',
                    borderRadius:'none',
                    boxShadow:'none',
                    iconColor:'black',
                    lineColor: 'black'
                }}
            autoFocus
            fuseOptions={{ keys: ["title", "description", "content"] }}
            resultStringKeyName="title"
          /> 
        </>
    )
}

export default Autocomplete
