import { useEffect, useState } from "react";
import { useParams } from "wouter";
import usePageTitle from "../hooks/page-title";
import LayoutWithAside from "../components/layout-with-aside";
import ArticleLinks from "../components/blog/article-links";
import Article from "../components/blog/article";

interface BlogArticle {
  id: string;
  title: string;
}

const Blog = () => {
  const setPageTitle = usePageTitle("Blog");

  const params = useParams<{ blogId?: string }>();
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    fetch(`/blog/index.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((articles: BlogArticle[]) => {
        if (articles) {
          setArticles(articles);
        }
      });
  }, []);

  useEffect(() => {
    const article = articles.find((article) => article.id === params.blogId);
    if (article) {
      setPageTitle(article.title);
    } else {
      setPageTitle("Blog");
    }
  }, [params.blogId, articles]);

  return (
    <LayoutWithAside
      main={
        params.blogId ? <Article id={params.blogId} /> : <div>PLACEHOLDER</div>
      }
      aside={<ArticleLinks articles={articles}></ArticleLinks>}
    />
  );
};

export default Blog;
