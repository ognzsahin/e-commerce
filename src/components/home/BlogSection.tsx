import BlogCard, { blogPost } from "../common/BlogCard";

function BlogSection() {
    return(
        <section className='w-full py-[80px]'>

            {/* BAŞLIK BLOĞU */}
            <div className='flex flex-col items-center text-center gap-4 mb-[80px] px-8 pl-[80px] pr-[80px]'>

                <p className='text-[#23A6F0] text-sm font-bold tracking-widest'>
                    Practice Advice
                </p>

                <h2 className='text-[40px] font-bold text-[#252B42]'>
                    Featured Products
                </h2>

                <p className='text-[14px] leading-[20px] tracking-[0.2px] font-normal text-[#737373] text-center max-w-[469px]'
                   style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Problems trying to resolve the conflict between
                    the two major realms of Classical physics: Newtonian mechanics
                </p>
            </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-y-2 lg:gap-x-[10px] lg:max-w-[1040px] lg:mx-auto'>
               {blogPost.map((post) => (
                   <BlogCard key={post.id} post={post} />
               ))}
           </div>

        </section>
    )
}

export default BlogSection;