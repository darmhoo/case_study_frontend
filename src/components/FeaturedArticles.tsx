import { Link } from "react-router"

export default function FeaturedArticles({ articles }: { articles: Article[] }) {




    return (
        <div className="flex gap-10 items-center">
            <Link to={articles[0].url} target="_blank" className="w-3/5">
                <div className="flex flex-col gap-2 justify-center">
                    <div>{articles[0].author}</div>
                    <div className="font-bold text-4xl">{articles[0].title}</div>
                    <div className="font-bold text-sm mr-10 text-blue-700"> Date: {articles[0].publishedAt}</div>
                    <div className="w-full rounded-lg">
                        <img src={articles[0].img_url} alt="hero" className="w-full rounded-lg" />
                    </div>
                </div>
            </Link>

            <div className="flex flex-col w-2/5 gap-5">
                {articles.slice(1, 5).map((article) => (
                    <Link to={article.url} target="blank" key={article.id}>
                        <div className="flex items-center gap-3">
                            <div className="w-3/5">
                                <div className="font-bold text-md">{article.title}</div>
                                <div className="text-sm">{article.summary}</div>
                                <div className="text-green-600 capitalize">{article.category}</div>
                            </div>
                            <div className="w-2/5 rounded-lg">
                                <img src={article.img_url} alt="img" className="w-full h-[150px] rounded-lg" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}