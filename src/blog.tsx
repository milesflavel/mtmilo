import Markdown from "react-markdown";
import { useParams } from "wouter";

const BLOG_ENTRIES: { [blogId: string]: string } = {
  "0-is-this-thing-on": "# Test\nTesting...\nTesting...\n1 2 3",
};

const Blog = () => {
  const params = useParams<{ blogId?: string }>();

  return (
    <div style={{ height: "100%", padding: "var(--sizing-padding)" }}>
      <Markdown>
        {params.blogId && BLOG_ENTRIES[params.blogId]
          ? BLOG_ENTRIES[params.blogId]
          : "# Not Found"}
      </Markdown>
    </div>
  );
};

export default Blog;
