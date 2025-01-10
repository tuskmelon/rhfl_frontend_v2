import moment from "moment";
import Link from "next/link";
import { blogCarousel } from "@/api/BlogApi";
import Image from "next/image";

const Blogs = async ({ filteredBlogs = false }) => {
  // Fetch data from the blogCarousel API
  let data = await blogCarousel();

  // Limit the data to 3 items if filteredBlogs is true
  if (filteredBlogs && data?.length > 3) {
    data = data.slice(0, 3);
  }

  return (
    <div className="cardContainer grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:m-0 m-3 md:!gap-4 gap-1">
      {data?.map((item, index) => (
        <div
          key={item.id}
          className="BlogCard my-3 hover:scale-105 hover:shadow-lg bg-white border border-[#0000001f] rounded-[.25rem] overflow-hidden cursor-pointer shadow-[0_13px_27px_-5px_hsla(240,30.1%,28%,0.25),0_8px_16px_-8px_hsla(0,0%,0%,0.3),0_-6px_16px_-6px_hsla(0,0%,0.03)] transition-all ease-in-out duration-300"
        >
          <Link href={`/blogs/${item?.slug}`} prefetch={true}>
            <div className="BlogImage">
              <Image
                width={300}
                height={300}
                src={item?.Featured_img?.url || "/placeholder-image.png"}
                alt={item?.Title || "Blog image"}
                className="object-fill md:min-h-80 min-h-auto w-full"
              />
            </div>
            <div className="BlogContent p-4">
              <h1 className="BlogTitle md:text-lg text-md pt-3 pb-2">
                {item?.Title || "Untitled Blog"}
              </h1>
              <p className="BlogDescription md:text-sm text-xs font-normal">
                {item?.seo?.description || "No description available"}
              </p>
              <div className="BlogDate pt-5 text-sm font-normal">
                <hr className="border border-[#e4e4e4]" />
                Published On - {moment(item?.date).format("MMMM Do YYYY")}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
