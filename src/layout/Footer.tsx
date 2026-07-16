import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";


function Footer() {
  return (
    <footer className="bg-[#FAFAFA] text-[#737373] gap-10  text-sm font-Montserrat">

        {/* Footer İlk Bölümü */}
        <div className="flex flex-col items-start gap-4 px-[44px] py-[40px] bg-[#FAFAFA]
                                        md:flex-row md:justify-between md:items-center md:px-[12.2em] md:py-[7em]">

        <span className='text-[#252B42] tracking-[3px] font-bold text-3xl '> TANRIKUT </span>

            <div className='flex flex-row gap-3 text-[#23A6F0]'>
                <a href='https://facebook.com' target="_blank" rel="noreferrer" aria-label='Facebook' className='hover:text-gray-300'>
                    <FaFacebook size={16} />
                </a>
                <a href='https://instagram.com/nihaszugo' target="_blank" rel="noreferrer" aria-label='Instagram' className='hover:text-gray-300'>
                    <FaInstagram size={16} />
                </a>
                <a href='https://X.com' target="_blank" rel="noreferrer" aria-label='X' className='hover:text-gray-300'>
                    <FaXTwitter size={16} />
                </a>
            </div>
        </div>


        {/* Footer İkinci Bölümü */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-18 md:gap-0
                            px-[30px] py-[50px] md:px-[14em] md:py-[10em] md:justify-between bg-white'>

            {/* Company */}
            <div className='flex flex-col gap-[20px] font-semibold text-[14px]'>
                <h4 className="font-bold text-[#252B42] mb-4 text-[16px]">Company Info</h4>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">About Us</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Carrier</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">We are hiring</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Blog</span>
            </div>

            {/* Legal */}
            <div className='flex flex-col gap-[20px] font-semibold text-[14px]'>
                <h4 className="font-bold text-[#252B42] mb-4 text-[16px]">Legal</h4>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">About Us</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Carrier</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">We are hiring</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Blog</span>
            </div>

            {/* Features */}
            <div className='flex flex-col gap-[20px] font-semibold text-[14px]'>
                <h4 className="font-bold text-[#252B42] mb-4 text-[16px]">Features</h4>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Business Marketing</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">User Analytic</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Live Chat</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Unlimited Support</span>
            </div>

            {/* Resources */}
            <div className='flex flex-col gap-[20px] font-semibold text-[14px]'>
                <h4 className="font-bold text-[#252B42] mb-4 text-[16px]">Resources</h4>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">IOS & Android</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Watch a Demo</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">Customer</span>
                <span className="text-sm text-[#737373] hover:text-[#23A6F0] cursor-pointer">API</span>
            </div>

            <div className="flex flex-col gap-5 w-full">
              {/* Başlık */}
              <h3 className="text-[16px] font-bold text-[#252B42]">Get In Touch</h3>

              {/* Form */}
              <div className="flex flex-row md:flex-row w-full h-[58px]  min-w-0">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-gray-300 rounded-l-[5px] rounded-r-none px-4 py-2 w-full h-full text-[#737373] bg-[#FAFAFA]"
                />
                <button
                  type="button"
                  className="bg-[#23A6F0] text-white font-semibold rounded-r-[5px] shrink-0 rounded-l-none h-full px-6 hover:bg-[#1f92d8] transition-colors"
                >
                  Subscribe
                </button>
              </div>

              {/* Açıklama */}
              <p className="text-[9px] leading-[28px] text-[#737373] md:text-end">
                Glad contact with us...
              </p>
            </div>

        </div>


        {/* Footer Üçüncü Bölümü */}
        <div className="text-center bg-[#FAFAFA] py-[1em]">
            Copyright © 2026 <span className='font-bold'>TanrıKut</span>. All rights reserved.
        </div>

    </footer>
  )
}

export default Footer;


