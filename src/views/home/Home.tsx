import { useEffect, useState } from "react";
import apiClient from "../../services/api";
import useStore from "../../context/useStore";
import FeaturedArticles from "../../components/FeaturedArticles";
import { Link } from "react-router";
import ArticleReel from "../../components/ArticleReel";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>();
  const [token, setToken] = useStore<string>('token');
  const [categories, setCategories] = useState<string[]>();

  const fetchArticles = async () => {
    try {
      const res = await apiClient.get('/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArticles(res.data.articles);
      const cat = res.data.articles.map((item: Article) => {
        return item.category
      })
      setCategories(cat);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [])

  return (
    <div className="w-11/12 rounded-lg min-h-screen bg-primary my-5 p-5">
      {articles ? (
        <div>
          <FeaturedArticles articles={articles.slice(0, 6)} />

          <ArticleReel articles={articles.slice(10, 14)} text="Latest News" />

          <ArticleReel articles={articles.slice(83, 87)} text="Sports News" />

          <ArticleReel articles={articles.slice(25, 29)} text="Politics" />
          <ArticleReel articles={articles.slice(33, 37)} text="World News" />
          <ArticleReel articles={articles.slice(20, 24)} text="General" />




        </div>
      ) : ''}

    </div>
  );
}