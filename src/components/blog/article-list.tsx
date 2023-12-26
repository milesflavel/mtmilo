import usePagination from "../../hooks/pagination";
import { BlogArticle } from "../../services/blog-service";
import Article from "./article";

const articlesPerPage = 5;

const ArticleList = (props: { articles: BlogArticle[] }) => {
  const [
    articlesShown,
    page,
    pageCount,
    previousPage,
    nextPage,
    isFirstPage,
    isLastPage,
  ] = usePagination(props.articles, articlesPerPage, 0);

  return (
    <div className="flex flex-col gap-12 divide-y divide-solid">
      {articlesShown.map((article) => (
        <Article article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
