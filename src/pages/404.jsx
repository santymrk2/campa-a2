import Logo from '../assets/Logo.webp'
const Page404 = () => {
    return(
        <div className='flex flex-col justify-center items-center h-screen w-screen bg-zinc-700'>
            <img src={Logo} width={500} height={500} alt='404' />
        </div>
    )
}

export default Page404