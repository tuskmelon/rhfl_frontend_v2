import ReachUsCard from "./ReachUsCard";
import "./ReachUs.css";
import { handleBranchCardDetails } from "@/api/HomePageApi";

const ReachUs = async () => {
  const branchCardDetails = await handleBranchCardDetails()
  console.log(branchCardDetails, "branchCardDetails");
  return (
    <div className="max-w-[1280px] m-auto">
      <h2
        className=" mb-5 font-medium text-center text-[#414141] md:text-[2.75rem] text-[1.5rem]"
        style={{ marginTop: "5rem" }}
         data-aos="fade-up"
      >
        Reach Us
      </h2>
      <ReachUsCard
        branchCardDetails={branchCardDetails}
      />
    </div>
  );
};

export default ReachUs;
