import hero from "../../assets/hero.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react"

function HeroBanner() {
    return(
        <div className='relative w-full h-[713px] md:h-[716px] flex items-center text-white overflow-hidden'>

            <div className='absolute inset-0 w-full flex flex-col
                items-center text-center justify-center px-6 gap-[35px]
                md:items-start md:text-left md:pl-24 lg:pl-32
                z-20'>

                <h5 className='text-sm font-bold tracking-[0.1em] text-white uppercase'>
                    SUMMER 2026
                </h5>

                <h1 className='text-5xl md:text-[58px] font-bold md:leading-[80px] md:tracking-[0.2px] text-white'>
                    NEW COLLECTION
                </h1>

                {/* BURAYI TEKRARDAN DÜZENLEMELİYİM!!!!!!!!! */}

                <p
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  className="mt-[24px] md:mt-[12px] text-[20px] leading-[30px] tracking-[0.2px] text-white font-normal text-center md:text-left"
                >
                    We know how large objects will act, but things on a small scale.
                </p>

                <button
                    type="button"
                    className='px-10 py-3 font-bold bg-[#2DC071] text-white
                        rounded-md hover:bg-[#25a25f] transition-colors tracking-wide text-sm'
                >
                    SHOP NOW
                </button>
            </div>

            <img
                src={hero}
                alt="Hero Banner"
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{ objectPosition: '55%' }}
            />

            <button
                type='button'
                onClick={() => console.log("Sağ oka tıklandı")}
                className='absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 hover:scale-110 transition-transform cursor-pointer'
                aria-label="Next Slide"
            >
                <ChevronRight size={60}/>
            </button>

            <button
                type='button'
                onClick={() => console.log("Sol oka tıklandı")}
                className='absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 hover:scale-110 transition-transform cursor-pointer'
                aria-label="Previous Slide"
            >
                <ChevronLeft size={60}/>
            </button>

            <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2'>
                <span className='w-6 h-[3px] bg-white rounded-full' />
                <span className='w-3 h-[3px] bg-white/40 rounded-full' />
            </div>
        </div>
    );
}

export default HeroBanner;