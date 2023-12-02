import { useEffect, useState } from "react";
import { useParams } from "wouter";
import Markdown from "react-markdown";
import LoadingSpinner from "../components/loading-spinner";

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
      setLoading(false);
    }
  }, [params.blogId]);

  return (
    <div className="bg-purple-900/80 backdrop-blur h-full p-4 rounded-3xl">
      {loading ? (
        <LoadingSpinner />
      ) : content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default Blog;
