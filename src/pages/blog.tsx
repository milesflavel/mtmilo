import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import usePageTitle from "../hooks/page-title";
import LayoutWithAside from "../components/layout-with-aside";
import ArticleLinks from "../components/blog/article-links";
import Article from "../components/blog/article";
import ArticleList from "../components/blog/article-list";
import BlogService, { BlogArticle } from "../services/blog-service";
import useOpenGraph from "../hooks/open-graph";
import openGraphImageUrl from "../assets/images/open-graph.png?url";

const BASE_URL = "https://www.mtmilo.net";

const Blog = () => {
  const setPageTitle = usePageTitle("Blog");
  const setOpenGraph = useOpenGraph({});

  const [location] = useLocation();
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
      setOpenGraph({
        title: foundArticle.title,
        type: "article",
        url: `${BASE_URL}${location}`,
        image: `${BASE_URL}${openGraphImageUrl}`,
        description: foundArticle.description,
        articlePublished: foundArticle.published,
        articleModified: foundArticle.modified,
      });
      setArticle(foundArticle);
    } else {
      setPageTitle("Blog");
      setOpenGraph({});
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
