import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

function GptSearch() {
  return (
    <>
      <div className="absolute -z-10 ">
        <img
          className='h-screen object-cover w-screen'
          alt=" bg h-screen "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7a8c0067-a424-4e04-85f8-9e25a49a86ed/web/IN-en-20250120-TRIFECTA-perspective_860a95da-c386-446e-af83-fef8ddd80803_large.jpg"
        ></img>
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
        <div className="bg-black fixed top-0 z-1 h-screen w-full opacity-30"></div>
      </div>
    </>
  );
}

export default GptSearch;
