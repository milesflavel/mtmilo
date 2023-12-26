import { useEffect, useState } from "react";
import { useParams } from "wouter";
import usePageTitle from "../hooks/page-title";
import LayoutWithAside from "../components/layout-with-aside";
import ArticleLinks from "../components/blog/article-links";
import Article from "../components/blog/article";
import ArticleList from "../components/blog/article-list";
import BlogService, { BlogArticle } from "../services/blog-service";

const Blog = () => {
  const setPageTitle = usePageTitle("Blog");

  const params = useParams<{ blogId?: string }>();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [article, setArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    BlogService.getIndex().then((articles: BlogArticle[]) => {
      if (articles) {
        setArticles(articles);
      }
    });
  }, []);

  useEffect(() => {
    const foundArticle = articles.find(
      (article) => article.id === params.blogId,
    );
    if (foundArticle) {
      setPageTitle(foundArticle.title);
      setArticle(foundArticle);
    } else {
      setPageTitle("Blog");
      setArticle(null);
    }
  }, [params.blogId, articles]);

  return (
    <LayoutWithAside
      main={
        <section className="prose prose-neutral prose-invert">
          {article ? (
            <Article article={article} />
          ) : (
            <ArticleList articles={articles} />
          )}
        </section>
      }
      aside={<ArticleLinks articles={articles} />}
    />
  );
};

export default Blog;
