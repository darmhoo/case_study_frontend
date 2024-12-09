import { Link } from "react-router"

export default function ArticleReel({ articles, text }: { articles: Article[], text: string }) {




    return (
        <div className="bg-white my-10 p-5 rounded-lg">
            <h3 className="font-bold text-lg">{text}</h3>
            <div className="flex gap-5">
                {articles.slice(0, 4).map((item) => (
                    <Link to={item.url} target="_blank" className="w-full flex flex-col gap-1">
                        <div className="">
                            <div className="rounded-lg"><img src={item.img_url} alt="" className="w-full h-[200px] rounded-lg" /></div>
                            <div className="text-blue-500">{item.author === null ? 'Anonymoues' : item.author}</div>
                            <div className="text-yellow-400">{item.publishedAt}</div>
                            <div className="">{item.title}</div>
                        </div>
                    </Link>

                ))}
            </div>
            <div></div>
        </div>);
}