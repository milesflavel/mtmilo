import { useEffect, useState } from "react";

const usePageTitle = (initialTitle: string) => {
  const [pageTitle, setPageTitle] = useState(initialTitle);

  useEffect(() => {
    document.title = `${pageTitle} - mtmilo`;
  }, [pageTitle]);

  return setPageTitle;
};

export default usePageTitle;
