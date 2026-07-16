import { AiOutlineCalendar } from "react-icons/ai"
import { AiOutlineComment } from "react-icons/ai"
import { AiOutlineRight } from "react-icons/ai"


import blogPhotoOne from "../../assets/blog/blogPhotoOne.jpg";
import blogPhotoTwo from "../../assets/blog/blogPhotoTwo.jpg";
import blogPhotoThree from "../../assets/blog/blogPhotoThree.jpg";

export interface BlogPost {
    id: number;
    image: string;
    tags: string[];
    title: string;
    description: string;
    date: string;
    comments: number;
    isNew: boolean;
}

export const blogPost: BlogPost[] = [
    {
        id: 1,
        image: blogPhotoOne,
        tags: ["Google", "Trending", "New"],
        title: "Loudest à la Madison #1 (L'integral)",
        description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "08 August 2026",
        comments: 10,
        isNew: true,
    },
    {
        id: 2,
        image: blogPhotoTwo,
        tags: ["Google", "Trending", "New"],
        title: "Loudest à la Madison #1 (L'integral)",
        description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "08 August 2026",
        comments: 10,
        isNew: true,
    },
    {
        id: 3,
        image: blogPhotoThree,
        tags: ["Google", "Trending", "New"],
        title: "Loudest à la Madison #1 (L'integral)",
        description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "08 August 2026",
        comments: 10,
        isNew: true,
    },
];

interface BlogCardProps {
    post: BlogPost;
}


function BlogCard({ post }: BlogCardProps) {
    return(

        <div className='relative flex flex-col overflow-hidden'>

            <div className='relative w-[330px] h-[300px] md:w-[348px] md:h-[300px] lg:w-full overflow-hidden lg:mx-0 mx-auto'>

              {/* BADGE - NEW */}
              {post.isNew &&(
                <div className='absolute top-3 left-3 bg-[#E74040] px-3 py-1 text-xs font-bold rounded z-20'>
                  <span className='text-[#FFFFFF]'>NEW</span>
                </div>
              )}

              {/* GÖRSEL */}
              <img src={post.image} alt={post.title} className='w-full h-full object-cover' />
            </div>


            {/* METİN BLOĞU */}
            <div className='flex flex-col  border border-gray-200
                                shadow-md shadow-black/10
                                    w-[330px] md:w-[348px] md:h-[300px]
                                        gap-[10px] px-[25px] pt-[25px] pb-[35px]
                                            lg:w-full lg:mx-0 mx-auto'>

                {/* TAG'ler */}
                <div className='flex gap-3'>
                    {post.tags.map((tag, index) => (
                        <span key={index} className='text-gray-400 text-sm font-bold hover:text-[#23A6F0] transition-colors cursor-pointer'>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* BAŞLIK */}
                <div className='font-normal text-[#252B42] text-xl'>
                    {post.title}
                </div>

                {/* AÇIKLAMA */}
                <p className='text-[#737373] text-sm leading-relaxed'>
                    {post.description}
                </p>

                {/* TARİH + YORUM */}
                <div className='flex items-center justify-between text-[#737373] text-sm py-4'>
                    <span className='flex items-center gap-1'>
                        <AiOutlineCalendar size={14} />
                        {post.date}
                    </span>

                    <span className='flex items-center gap-1'>
                        <AiOutlineComment size={14} />
                        {post.comments} comments
                    </span>
                </div>

                {/* LEARN MORE */}
                <a href='#' className='flex items-center gap-1 text-gray-400 font-bold text-base hover:text-[#23A6F0] transition-colors'>
                    Learn More
                    <AiOutlineRight className='text-[#23A6F0] text-2xl font-light' />
                </a>

            </div>
        </div>
   )
}

export default BlogCard;