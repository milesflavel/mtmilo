import { useEffect, useState } from "react";
import { useParams } from "wouter";
import Markdown from "react-markdown";
import LoadingSpinner from "../components/loading-spinner";
import Pane from "../components/pane";
import usePageTitle from "../hooks/page-title";

const Blog = () => {
  const setPageTitle = usePageTitle("Blog - mtmilo");

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
            setPageTitle(`${params.blogId} - mtmilo`);
            setContent(value);
          } else {
            setPageTitle("Blog - mtmilo");
            setContent(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPageTitle("Blog - mtmilo");
      setContent(null);
      setLoading(false);
    }
  }, [params.blogId]);

  return (
    <Pane className="h-full p-4">
      {loading ? (
        <LoadingSpinner />
      ) : content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <div>Not Found</div>
      )}
    </Pane>
  );
};

export default Blog;
