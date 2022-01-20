
const Footer = () => {
    
    return (
        <footer className="flex flex-col items-center justify-center bg-black text-white">
            <div className='w-full flex justify-center bg-neutral-800'>
            <img src={`${require('/public/images/EFE.svg').default.src}`} alt="" className='h-full px-4 py-20' />
            </div>
            <ul className="flex md:flex-row items-center justify-center py-4 bg-black w-full">
                <a className='flex flex-col md:flex-row my-8 h-10  mr-4' href=''><img src={`${require('/public/images/instagram.png').default.src}`} alt="" className='h-full px-4' /><span className='flex items-center justify-center'>Instagram</span></a>
                <a className='flex flex-col md:flex-row my-8 h-10  mr-4'><img src={`${require('/public/images/snapchat.png').default.src}`} alt="" className='h-full px-4'/><span className='flex items-center justify-center'>Snapchat</span></a>
               {/*<a className='flex flex-col md:flex-row my-8 h-10  mr-4'><img src={`${require('/public/images/youtube.png').default.src}`} alt="" className='h-full px-4'/><span className='flex items-center justify-center'>Youtube</span></a>*/}
                <a className='flex flex-col md:flex-row my-8 h-10'><img src={`${require('/public/images/twitter.png').default.src}`} alt="" className='h-full px-4'/><span className='flex items-center justify-center'>Twitter</span></a>
            </ul>
            <div className="flex flex-wrap items-center justify-between md:px-10 py-4 bg-black w-full md:w-4/5 border-t border-gray-300">
                <p className='flex order-2 text-center w-full md:w-1/5 justify-center md:order-first'>2022 all rights reserved</p>
                <ul className='flex w-full md:w-3/5 flex-col md:flex-row md:justify-between'>
                <li className='flex h-10 mr-4 text-center justify-center py-4 md:py-0'><a className='flex items-center justify-center'>Home</a></li>
                <li className='flex h-10 mr-4 text-center justify-center py-4 md:py-0'><a className='flex items-center justify-center'>Wellness</a></li>
                <li className='flex h-10 mr-4 text-center justify-center py-4 md:py-0'><a className='flex items-center justify-center'>Motivation</a></li>
                <li className='flex h-10 text-center justify-center py-4 md:py-0'><a className='flex items-center justify-center'>About</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
