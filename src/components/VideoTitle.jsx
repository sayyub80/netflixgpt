import { IoMdPlay } from "react-icons/io";
import { MdOutlineInfo } from "react-icons/md";


function VideoTitle({title,overview}) {
  return (
    <div className=" pt-[23%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black  aspect-video">
      <h1 className=" md:text-[2.4em] font-bold">{title}</h1>
      <p className=" md:py-6 text-[8px] w-[60%] md:text-sm md:w-[28%]">{overview}</p>
       <div>
        <button className="mt-2 md:mt-0 md:font-semibold cursor-pointer bg-white text-black py-1 pl-2 md:pl-4 md:py-2 md:px-9 pr-5 md:pr-11 rounded-sm hover:opacity-80"><IoMdPlay className='inline pb-1 md:text-xl'/> Play</button>
        <button className="hidden md:inline-block font-semibold cursor-pointer bg-gray-500  text-white py-2 px-5 mx-4 rounded-sm hover:opacity-80"><MdOutlineInfo className='inline text-xl mr-1 pb-1'/>More Info</button>
      </div>

    </div>
  )
}

export default VideoTitle
