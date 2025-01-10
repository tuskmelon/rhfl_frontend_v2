import Breadcrumbs from "@/components/Breadcrumbs"
import HomeLoanCalculator from "@/components/Home/Calculator/HomeLoanCalculator"
import { MetaTags } from "@/components/MetaTags";

export async function generateMetadata() {
    const title = "EMI Calculator | Repco Home Loans";
    const description = "Repco Home Loans - EMI Calculator ";

    const metaData = MetaTags({ title, description });


    return metaData;
}

const pages = () => {
    return (
        <div className=' mb-8 max-w-[1280px] m-auto'>
            <Breadcrumbs />
            <HomeLoanCalculator />
        </div>
    )
}

export default pages
