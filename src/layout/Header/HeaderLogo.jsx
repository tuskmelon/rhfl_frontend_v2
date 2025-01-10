import { handleHeaderLogo } from "@/api/LayoutApi";
import repcoLogo from '../../assets/repcologo.png'
import Image from "next/image";

const HeaderLogo = async ({ headerLogo}) => {

  // const headerLogo = await handleHeaderLogo();

  return (
    <div>
      {headerLogo && (
        <Image
          src={headerLogo?.Logo[0]?.img?.url || repcoLogo}
          width={160}
          height={124}
          className="header-logo md:w-[150px] md:h-[110px] w-[100px] h-[80px]"
          alt="Header Logo"
        />
      )}
    </div>
  );
};

export default HeaderLogo;
