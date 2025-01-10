import "./Banner.css";
import { Carousel } from "flowbite-react";
import { handleCarousel } from "@/api/HomePageApi";
import Link from "next/link";
import Image from "next/image";

const Banner = async () => {

  const bannerSlider = await handleCarousel();

  return (
    <>
      <div className="lg:-mt-10">
        <Carousel slideInterval={5000}>
          {bannerSlider && bannerSlider[0]?.banners?.length > 0 ? (
            bannerSlider[0]?.banners?.map((item, index) => (
              <div key={item.id} className="pickgradient relative">
                {item.alternativeText === "video" ? (
                  <video
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "0.25rem",
                    }}
                    autoPlay
                    muted
                    loop
                    preload="auto"
                  >
                    <source
                      src={`${item?.img?.url}`}
                      type="video/mp4"
                    />
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <Link href={`${item?.link}`}>
                    <Image
                      className="d-block w-100 Carousel-image "
                      src={`${item?.img?.url}`}
                      alt={`Slide ${item?.id}`}
                      style={{
                        objectPosition: "center",
                        objectFit: "fill",
                      }}
                      width={1920}
                      height={1080}
                    />
                  </Link>
                )}
                <div className="absolute bottom-4 left-4">
                  {
                    item?.caption?.length > 0 &&
                    <h4 className="Carousel-title text-white text-[1.25rem] font-semibold">
                      {item?.caption}
                    </h4>
                  }
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white">Loading carousel...</div>
          )}
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
