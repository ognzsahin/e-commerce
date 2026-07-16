import carouselOne from "../../assets/productCarousel/carouselOne.png";
import { ChevronLeft, ChevronRight } from "lucide-react"

function ProductCarousel() {
    return(
        <div className='relative w-full flex flex-col bg-[#23856D] text-white md:pl-[150px] md:pr-0 md:flex-row md:h-[600px] justify-between'>

            <div className='flex flex-col items-center text-center px-20 pt-[150px] pb-8 gap-6
                md:items-start md:text-left md:justify-center md:w-1/2 md:pl-24 md:pt-0 md:pb-0'>

                <h5 className='text-lg font-medium tracking-[0.2em] text-white uppercase'>
                    SUMMER 2026
                </h5>

                <h1 className='text-[40px] font-bold leading-[50px] text-white tracking-[1.0px]'>
                    Vita Classic Product
                </h1>

                <p style={{ fontFamily: "Montserrat, sans-serif" }}
                   className="text-[16px] leading-[30px] tracking-[0.2px] text-[#FFFFFF] font-normal text-center md:text-left max-w-[420px] ">
                    We know how large objects will act, but things on a small scale.
                </p>

                <span className='text-[24px] font-bold text-white'>
                    $16.48
                </span>


                <div className='flex items-center justify-between w-full'>
                    <button type='button'
                        onClick={() => console.log("Sol")}
                        className='text-white hover:scale-110 transition-transform md:hidden'>
                        <ChevronLeft size={48} strokeWidth={1}/>
                    </button>

                    <button type="button"
                        className='py-[15px] px-[40px] font-semibold bg-[#2DC071] text-white
                            rounded-md hover:bg-[#25a25f] transition-colors tracking-[0.2px] text-base'>
                        ADD TO CART
                    </button>

                    <button type='button'
                        onClick={() => console.log("Sağ")}
                        className='text-white hover:scale-110 transition-transform md:hidden'>
                        <ChevronRight size={48} strokeWidth={1}/>
                    </button>
                </div>
            </div>


            <div className='flex justify-end w-full'>
                <img
                    src={carouselOne}
                    alt="Carousel Photo"
                    className="w-full h-full object-contain object-top md:object-center "
                />
            </div>

            {/* Desktop okları */}
            <button type='button'
                className='hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 hover:scale-110 transition-transform'>
                <ChevronLeft size={36}/>
            </button>
            <button type='button'
                className='hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 hover:scale-110 transition-transform'>
                <ChevronRight size={36}/>
            </button>

            {/* Slider dots */}
            <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2'>
                <span className='w-6 h-[3px] bg-white rounded-full' />
                <span className='w-3 h-[3px] bg-white/40 rounded-full' />
            </div>
        </div>
    );
}

export default ProductCarousel;