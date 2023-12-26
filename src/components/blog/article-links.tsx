import HeaderLink from "../header-link";

const ArticleLinks = (props: { articles: { id: string; title: string }[] }) => {
  return (
    <>
      <h2 className="pb-3 text-center text-xl font-bold">Articles</h2>
      <ul className="list-disc">
        {props.articles.map((article) => (
          <li key={article.id}>
            <HeaderLink to={`/blog/${article.id}`}>{article.title}</HeaderLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticleLinks;
