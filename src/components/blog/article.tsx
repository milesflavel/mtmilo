import Markdown from "react-markdown";
import LoadingSpinner from "../loading-spinner";
import { useEffect, useState } from "react";
import BlogService, { BlogArticle } from "../../services/blog-service";
import HeaderLink from "../header-link";

const Article = (props: { article: BlogArticle; stub?: boolean }) => {
  const [content, setContent] = useState<string | undefined>(undefined);
  const [published, setPublished] = useState<Date | undefined>(undefined);
  const [modified, setModified] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const getStub = (content: string) => {
    return content
      .split(/(?:\n|\r|\r\n){2}/)
      .filter(Boolean)
      .slice(0, 10)
      .join("\n")
      .concat("\n...");
  };

  useEffect(() => {
    setLoading(true);

    BlogService.getArticle(props.article.id)
      .then((value) => {
        if (value) {
          setContent(props.stub ? getStub(value) : value);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    setPublished(new Date(props.article.published));
    setModified(
      props.article.modified !== props.article.published
        ? new Date(props.article.modified)
        : undefined,
    );
  }, [props.article]);

  return (
    <article className="py-4">
      <header>
        <h1 className="my-0">
          <HeaderLink
            to={`/blog/${props.article.id}`}
            className="font-extrabold"
          >
            {props.article.title}
          </HeaderLink>
        </h1>

        <p className="my-0">
          <span className="text-xs italic">
            Published{" "}
            <time dateTime={published?.toISOString()}>
              {published?.toLocaleDateString()}
            </time>
            {modified && (
              <>
                {" ("}
                Last modified{" "}
                <time dateTime={modified?.toISOString()}>
                  {modified?.toLocaleDateString()}
                </time>
                {")"}
              </>
            )}
          </span>
        </p>
      </header>

      {loading ? (
        <LoadingSpinner />
      ) : content ? (
        <>
          <Markdown
            components={{
              // Skew the header tags because h1 is already used for the article title
              h1: "h2",
              h2: "h3",
              h3: "h4",
              h4: "h5",
              h5: "h6",
            }}
          >
            {content}
          </Markdown>
          {props.stub && (
            <HeaderLink to={`/blog/${props.article.id}`}>
              Continue reading
            </HeaderLink>
          )}
        </>
      ) : (
        <div>Not Found</div>
      )}
    </article>
  );
};

export default Article;
