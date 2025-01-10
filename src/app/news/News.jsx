
import { NewsUpdate } from "@/api/NewsApi";
// import {REACT_APP_BASE_URL} from "@/env/env";
import "./News"
import Link from "next/link";
import Image from "next/image";

// import { useNewsUpdate } from "@/query/useQuery";
const News = async () => {

  const news = await NewsUpdate();
  // console.log(news, "news");


  return (
    <>
      <div className="p-5 mb-3 newsContainer">
        {
          news?.map((item, index) => (
            <div className="" key={item.id}>
              <p className="newsDescription text-sm font-normal py-2">
                <Link href={item?.NewsPDF?.url} target="_blank" prefetch={true} className="flex gap-2 mb-3">
                  <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />  {item.NewsUpdates}
                </Link>
              </p>
            </div>
          ))}
      </div>
    </>

  )
}


export default News