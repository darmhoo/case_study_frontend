import { useEffect, useState } from "react";
import apiClient from "../../services/api";
import useStore from "../../context/useStore";
import FeaturedArticles from "../../components/FeaturedArticles";
import ArticleReel from "../../components/ArticleReel";
import ArticleFilter from "../../components/ArticleFilter";
import { Link } from "react-router";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>();
  const [searchResults, setSearchResults] = useState<Article[]>();
  const [token, setToken] = useStore<string>('token');
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const fetchArticles = async () => {
    try {
      const res = await apiClient.get('/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArticles(res.data.articles);
      let cat = res.data.articles.map((item: Article) => {
        if (item.category) return item.category
      })
      cat = [...new Set(cat)];
      setCategories(cat);

      let source = res.data.articles.map((item: Article) => {
        if (item.source) return item.source
      })
      source = [...new Set(source)];
      setSources(source);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const search = async (data: ISearch) => {
    console.log(data)

    try {
      const res = await apiClient.get('/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }, params: data
      });
      setSearchResults(res.data.articles);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const reset = () => {
    setSearchResults(undefined);
  }

  useEffect(() => {
    fetchArticles();
  }, [])

  return (
    <div className="w-11/12 rounded-lg min-h-screen bg-primary my-5 p-5">
      {articles ? (
        <div>
          <ArticleFilter categories={categories} sources={sources} searchActionB={search} resetB={reset} />
          <div>
            {searchResults ? (
              <div>
                <h2>Search Results</h2>
                <div className="">
                  {searchResults.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {searchResults.map((article) => (
                        <Link to={article.url} target="_blank" className="w-1/4 flex flex-col gap-1" key={article.id}>
                          <div className="">
                            <div className="rounded-lg"><img src={article.img_url} alt="" className="w-full h-[200px] rounded-lg" /></div>
                            <div className="text-blue-500">{article.author === null ? 'Anonymoues' : article.author}</div>
                            <div className="text-yellow-400">{article.publishedAt}</div>
                            <div className="">{article.title}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-2xl">
                      No Results To View
                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div>
                <FeaturedArticles articles={articles.slice(0, 6)} />
                <ArticleReel articles={articles.slice(10, 14)} text="Latest News" />
                <ArticleReel articles={articles.slice(83, 87)} text="Sports News" />
                <ArticleReel articles={articles.slice(25, 29)} text="Politics" />
                <ArticleReel articles={articles.slice(33, 37)} text="World News" />
                <ArticleReel articles={articles.slice(20, 24)} text="General" /></div>
            )}
          </div>

        </div>
      ) : ''}

    </div>
  );
}