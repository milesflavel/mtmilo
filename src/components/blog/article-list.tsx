import usePagination from "../../hooks/pagination";
import { BlogArticle } from "../../services/blog-service";
import Icon from "../icon";
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

  const currentPage = page + 1;
  const paginationText = `Page ${currentPage} of ${pageCount}`;

  return (
    <>
      <div className="flex flex-col gap-12 divide-y divide-solid">
        {articlesShown.map((article) => (
          <Article article={article} stub key={article.id} />
        ))}
      </div>
      <footer className="flex items-center justify-center gap-4">
        <button
          className="rounded-2xl bg-purple-500/10 p-2 hover:bg-purple-500/20 focus:bg-purple-500/20 disabled:bg-purple-500/10 disabled:opacity-50"
          disabled={isFirstPage}
          onClick={previousPage}
          title={
            isFirstPage
              ? "Go to previous page"
              : `Go to page ${currentPage - 1}`
          }
          type="button"
        >
          <Icon icon="chevronLeft" />
        </button>
        <span className="text-sm italic">{paginationText}</span>
        <button
          className="rounded-2xl bg-purple-500/10 p-2 hover:bg-purple-500/20 focus:bg-purple-500/20 disabled:bg-purple-500/10 disabled:opacity-50"
          disabled={isLastPage}
          onClick={nextPage}
          title={
            isLastPage ? `Go to next page` : `Go to page ${currentPage + 1}`
          }
          type="button"
        >
          <Icon icon="chevronRight" />
        </button>
      </footer>
    </>
  );
};

export default ArticleList;
