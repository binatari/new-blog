

const Dropdown = ({category}) => {
    return (
        <>
             <div class="group inline-block relative">
        <button
          class=" text-black group-hover:text-purple-500 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span class="mr-1">{category.attributes.name}</span>
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          > 
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </button>
        <ul class="absolute hidden text-black bg-white pt-1 group-hover:block z-50">
          {
          category.attributes.subcategories.data.map((sub, i)=>
            (<li class={i == 0 && 'border-t-2 border-purple-500'} key={i}>
            <a
              class=" py-2 px-4 block whitespace-no-wrap text-black"
              href="#"
              >{sub.attributes.name}</a>
          </li>)
            )
            }
        </ul>
      </div> 
        </>
    )
}

export default Dropdown
