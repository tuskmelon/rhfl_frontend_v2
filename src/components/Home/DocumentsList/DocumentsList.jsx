import { handleDocumentList } from "@/api/HomePageApi";
import Document from "./Document";

const DocumentsList = async () => {
  const documents = await handleDocumentList();
  return (
    <div className="max-w-[1380px] m-auto DocumentList-wrapper_bg">
      <Document documents={documents} />
    </div>
  );
};

export default DocumentsList;
