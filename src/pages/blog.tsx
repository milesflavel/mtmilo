import { useEffect, useState } from "react";
import { useParams } from "wouter";
import Markdown from "react-markdown";
import LoadingSpinner from "../components/loading-spinner";
import usePageTitle from "../hooks/page-title";
import LayoutWithAside from "../components/layout-with-aside";

const Blog = () => {
  const setPageTitle = usePageTitle("Blog");

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
            setPageTitle(params.blogId);
            setContent(value);
          } else {
            setPageTitle("Blog");
            setContent(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPageTitle("Blog");
      setContent(null);
      setLoading(false);
    }
  }, [params.blogId]);

  return (
    <LayoutWithAside
      main={
        <section className="prose prose-neutral prose-invert">
          {loading ? (
            <LoadingSpinner />
          ) : content ? (
            <Markdown>{content}</Markdown>
          ) : (
            <div>Not Found</div>
          )}
        </section>
      }
      aside={<></>}
    />
  );
};

export default Blog;
