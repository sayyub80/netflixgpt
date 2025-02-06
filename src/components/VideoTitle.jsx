import { IoMdPlay } from "react-icons/io";
import { MdOutlineInfo } from "react-icons/md";


function VideoTitle({title,overview}) {
  return (
    <div className="pt-[23%] px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-[2.4em] font-bold">{title}</h1>
      <p className=" py-6  text-sm w-[28%]">{overview}</p>
       <div>
        <button className="font-semibold cursor-pointer bg-white text-black py-2 px-9 pr-11 rounded-sm hover:opacity-80"><IoMdPlay className='inline pb-1 text-xl'/> Play</button>
        <button className="font-semibold cursor-pointer bg-gray-500  text-white py-2 px-5 mx-4 rounded-sm hover:opacity-80"><MdOutlineInfo className='inline text-xl mr-1 pb-1'/>More Info</button>
      </div>

    </div>
  )
}

export default VideoTitle
