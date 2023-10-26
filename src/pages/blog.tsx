import { useEffect, useState } from "react";
import { useParams } from "wouter";
import Markdown from "react-markdown";

const Blog = () => {
  const params = useParams<{ blogId?: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params.blogId) {
      setLoading(true);
      fetch(`/blog/${params.blogId}.md`)
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
        })
        .then((value) => {
          if (value) {
            setContent(value);
          } else {
            setContent(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setContent(null);
    }
  }, [params.blogId]);

  return (
    <div style={{ height: "100%", padding: "var(--sizing-padding)" }}>
      {loading ? (
        <div>Loading...</div>
      ) : content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default Blog;
