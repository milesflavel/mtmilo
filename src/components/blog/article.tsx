import Markdown from "react-markdown";
import LoadingSpinner from "../loading-spinner";
import { useEffect, useState } from "react";

const Article = (props: { id: string }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/blog/${props.id}.md`)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((value) => {
        if (value) {
          setContent(value);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.id]);

  return (
    <section className="prose prose-neutral prose-invert">
      {loading ? (
        <LoadingSpinner />
      ) : content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <div>Not Found</div>
      )}
    </section>
  );
};

export default Article;
