import Markdown from "react-markdown";
import LoadingSpinner from "../loading-spinner";
import { useEffect, useState } from "react";
import BlogService, { BlogArticle } from "../../services/blog-service";
import HeaderLink from "../header-link";

const Article = (props: { article: BlogArticle }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    BlogService.getArticle(props.article.id)
      .then((value) => {
        if (value) {
          setContent(value);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.article]);

  return (
    <article className="py-4">
      <HeaderLink to={`/blog/${props.article.id}`}>
        <h1>{props.article.title}</h1>
      </HeaderLink>

      {loading ? (
        <LoadingSpinner />
      ) : content ? (
        <Markdown
          components={{
            // Skew the header tags because h1 is already used for the article title
            h1: "h2",
            h2: "h3",
            h3: "h4",
            h4: "h5",
            h5: "h6",
          }}
        >
          {content}
        </Markdown>
      ) : (
        <div>Not Found</div>
      )}
    </article>
  );
};

export default Article;
