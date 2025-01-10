
export const MetaTags = ({ title, description }) => {
  console.log(title, description);
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      images: ['https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_repcohome_logo_7c80641cfb_ef59cbb762.png'],
    },
  };
};
