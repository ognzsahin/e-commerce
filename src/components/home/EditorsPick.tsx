import men from "../../assets/men.jpg";
import women from "../../assets/women.jpg";
import accessories from "../../assets/accessories.jpg";
import kids from "../../assets/kids.jpg";

function EditorPick() {
    return (
        <section className='max-w-6xl mx-auto py-12 px-10 text-center '>

            {/* Başlık bloğu */}

            <h3 className='text-[26px] font-bold text-center text-[#252B42] tracking-[0.8px] font-[Montserrat, sans-serif]'

            >
                EDITOR'S PICK
            </h3>

            <p className="text-center mt-2 mx-auto text-[#737373] text-[14px] leading-[20px] tracking-[0.2px] font-normal max-w-[400px] font-[Montserrat]"
                style={{
                    maxWidth: "400px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0.2px",
                }}
            >
                Problems trying to resolve the conflict between
            </p>

            {/* Kart Container'ı */}
            <div className='flex flex-col gap-[14px] mt-8 md:flex-row md:items-stretch md:h-[500px] text-[#FAFAFA]'>

                {/* Kart 1 - MEN */}
                <div className='relative md:w-[40%] flex-shrink-0'>

                    <img
                        src={men}
                        alt="Men"
                        className="w-full h-[400px] md:h-full object-cover"
                    />
                    <div className='absolute bottom-4 left-4 bg-white px-12 py-3'>
                        <span className='font-bold text-[#252B42] tracking-widest text-sm'>MEN</span>
                    </div>
                </div>

                {/* Kart 2 - WOMEN */}
                <div className='relative md:flex-1'>
                    <img
                        src={women}
                        alt="Women"
                        className="w-full h-[400px] md:h-full object-cover"
                    />
                    <div className='absolute bottom-4 left-4 bg-white px-12 py-3'>
                        <span className='font-bold text-[#252B42] tracking-widest text-sm'>WOMEN</span>
                    </div>
                </div>

                {/* Sağ kolon - ACCESSORIES + KIDS üst-alt */}
                <div className='flex flex-col gap-[14px] flex-1 overflow-hidden'>

                    {/* Kart 3 - ACCESSORIES */}
                    <div className='relative flex-1 min-h-0'>
                        <img
                            src={accessories}
                            alt="Accessories"
                            className="w-full h-[200px] md:h-full object-cover"
                        />
                        <div className='absolute bottom-4 left-4 bg-white px-8 py-3'>
                            <span className='font-bold text-[#252B42] tracking-widest text-sm'>ACCESSORIES</span>
                        </div>
                    </div>

                    {/* Kart 4 - KIDS */}
                    <div className='relative flex-1 min-h-0'>
                        <img
                            src={kids}
                            alt="Kids"
                            className="w-full h-[200px] md:h-full object-cover"
                        />
                        <div className='absolute bottom-4 left-4 bg-white px-12 py-3'>
                            <span className='font-bold text-[#252B42] tracking-widest text-sm'>KIDS</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default EditorPick;