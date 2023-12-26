import Markdown from "react-markdown";
import LoadingSpinner from "../loading-spinner";
import { useEffect, useState } from "react";
import BlogService, { BlogArticle } from "../../services/blog-service";

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
      {loading ? (
        <LoadingSpinner />
      ) : content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <div>Not Found</div>
      )}
    </article>
  );
};

export default Article;
