import hooliLogo from "../../assets/brands/hooli.png";
import lyftLogo from "../../assets/brands/lyft.png";
import paypalLogo from "../../assets/brands/paypal.png";
import stripeLogo from "../../assets/brands/stripe.png";
import awsLogo from "../../assets/brands/aws.png";
import redditLogo from "../../assets/brands/reddit.png";

function ShopBrandsSection() {

    const brands = [
        { id: 1, name: "Hooli", logo: hooliLogo },
        { id: 2, name: "Lyft", logo: lyftLogo },
        { id: 3, name: "Paypal", logo: paypalLogo },
        { id: 4, name: "Stripe", logo: stripeLogo },
        { id: 5, name: "AWS", logo: awsLogo },
        { id: 6, name: "Reddit", logo: redditLogo },
    ];

    return (
        <div className="bg-[#FAFAFA] w-full pb-[40px]">
            <div className="flex flex-col lg:flex-row lg:flex-wrap items-center justify-center
                                gap-[60px] lg:gap-[80px]
                                    max-w-[414px] lg:max-w-[1050px] mx-auto py-[50px]">
                {brands.map((brand) => (
                    <img
                        key={brand.id}
                        src={brand.logo}
                        alt={brand.name}
                        className="h-14 w-auto grayscale opacity-70"
                    />
                ))}
            </div>
        </div>
    );
}

export default ShopBrandsSection;