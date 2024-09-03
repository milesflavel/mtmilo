import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import usePageTitle from "../hooks/page-title";
import LayoutWithAside from "../components/layout-with-aside";
import ArticleLinks from "../components/blog/article-links";
import Article from "../components/blog/article";
import BlogService, { BlogArticle } from "../services/blog-service";
import useOpenGraph from "../hooks/open-graph";
import openGraphImageUrl from "../assets/images/open-graph.png?url";
import ErrorNotFound from "../components/error-not-found";

const BASE_URL = "https://www.mtmilo.net";

const BlogArticlePage = () => {
  const setPageTitle = usePageTitle("Blog");
  const setOpenGraph = useOpenGraph({});

  const [location] = useLocation();
  const params = useParams<{ blogId?: string }>();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [article, setArticle] = useState<BlogArticle>();

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

    if (!foundArticle) {
      setPageTitle("Article Not Found");
      setOpenGraph({});
      setArticle(undefined);

      return;
    }

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
  }, [params.blogId, articles]);

  return (
    <LayoutWithAside
      main={
        article ? (
          <section className="prose prose-neutral prose-invert">
            <Article article={article} />
          </section>
        ) : (
          <ErrorNotFound />
        )
      }
      aside={<ArticleLinks articles={articles} />}
    />
  );
};

export default BlogArticlePage;
