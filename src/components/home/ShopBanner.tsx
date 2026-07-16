import { ChevronLeft, ChevronRight } from "lucide-react";
import shopBanner1 from "../../assets/shopBanner/shopBanner1.png";


function ShopBanner() {

    return(

        <div className='relative w-full flex flex-col bg-white md:flex-row md:h-[600px]'>

            <div className='flex flex-col items-center text-center
                px-6 pr-6 md:pr-0 pt-[150px] pb-8 gap-6 pl-[100px] pr-[100px]
                    md:justify-center md:w-1/2 md:pt-0 md:pb-0'>

                <h5 className='text-lg font-medium tracking-[0.2em] text-[#BDBDBD] uppercase'>
                    SUMMER 2026
                </h5>

                <h2 className='text-[40px] font-bold leading-[50px] text-black tracking-[0.2px] max-w-[303px] mx-auto'>
                    Vita Classic Product
                </h2>

                <p  className="text-[16px] leading-[30px] tracking-[0.2px] text-[#737373] font-normal text-center max-w-[303px] mx-auto ">
                    We know how large objects will act, but things on a small scale.
                </p>

                <div className='flex flex-col items-center md:items-start gap-[25px]'>

                    <button type="button"
                        className='bg-[#23A6F0] text-white font-semibold rounded-[5px]
                                        px-[40px] py-[15px] tracking-wide
                                            hover:bg-[#1f92d8] transition-colors
                                                text-sm md:text-base'>
                        BUY NOW
                    </button>

                    <button type="button"
                            className='bg-white text-[#23A6F0] font-semibold rounded-[5px]
                                            px-[40px] py-[15px] tracking-wide
                                                border-2 border-[#23A6F0]
                                                    hover:bg-[#23A6F0] hover:text-white hover:border-[#FFFFFF]
                                                       transition-colors text-sm md:text-base'>
                        Learn More
                    </button>
                </div>
            </div>
            <div className='w-full h-[403px] overflow-hidden md:w-full md:h-full'>
                <img
                    src={shopBanner1}
                    alt="Shop Banner"
                    className="w-full h-full object-cover object-[65%] md:object-center"
                />
            </div>
        </div>
    );
}


export default ShopBanner;