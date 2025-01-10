import { handleProductList } from "@/api/HomePageApi";
import "./Product.css";
import ProductCard from "./ProductCard";

const Products = async () => {
  const data = await handleProductList();
  return (
    <div className="max-w-[1380px] m-auto">
      <h2
        className=" mb-5 font-semibold text-center text-heading md:text-[2.75rem] text-[1.5rem] md:block hidden"
        style={{ marginTop: "5rem" }}
        data-aos="fade-up"
      >
        <span className="text-[#414141]">Our</span>  Products

      </h2>
      <ProductCard
        data={data}
      />
    </div>
  );
};

export default Products;
