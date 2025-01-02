import { useEffect, useState } from "react";
import usePageTitle from "../hooks/page-title";
import LayoutWithAside from "../components/layout-with-aside";
import ArticleLinks from "../components/blog/article-links";
import ArticleList from "../components/blog/article-list";
import BlogService, { BlogArticle } from "../services/blog-service";
import useOpenGraph from "../hooks/open-graph";

const BlogIndexPage = () => {
  usePageTitle("Blog");
  useOpenGraph({});

  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    BlogService.getIndex().then((articles: BlogArticle[]) => {
      if (articles) {
        setArticles(articles.reverse());
      }
    });
  }, []);

  return (
    <LayoutWithAside
      main={
        <section className="prose prose-neutral prose-invert">
          <ArticleList articles={articles} />
        </section>
      }
      aside={<ArticleLinks articles={articles} />}
    />
  );
};

export default BlogIndexPage;
