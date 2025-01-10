import ProductCardList from "@/components/Products/ProductCardList"


export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';
const Page =() => {
  return (
    <div className="mb-[5%]">
        <ProductCardList/>
    </div>
  )
}

export default Page