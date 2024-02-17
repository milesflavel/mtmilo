export interface BlogArticle {
  id: string;
  title: string;
  published: string;
  modified: string;
}

const getIndex = (): Promise<BlogArticle[]> =>
  fetch(`/blog/index.json`, { cache: "no-cache" }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

const getArticle = (id: string): Promise<string | undefined> =>
  fetch(`/blog/${id}.md`).then((response) => {
    if (response.ok) {
      return response.text();
    }
  });

export default {
  getIndex,
  getArticle,
};
