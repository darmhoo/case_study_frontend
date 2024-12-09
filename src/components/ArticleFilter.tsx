import { Search } from "lucide-react";
import React, { useState } from "react";

export default function ArticleFilter({ categories, sources, searchActionB, resetB }: { categories: string[], sources: string[], searchActionB: (data: ISearch) => void, resetB: () => void }) {
    const [keyword, setKeyword] = useState<string>();
    const [category, SetCategory] = useState<string>();
    const [source, setSource] = useState<string>();
    const [date, SetDate] = useState<string>();

    const searchAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const item: ISearch = {};
        if (keyword) item.keyword = keyword;
        if (category) item.category = category;
        if (source) item.source = source;
        if (date) item.date = date;
        searchActionB(item)

    }

    const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setKeyword('');
        setSource('');
        SetCategory('');
        SetDate('');
        resetB();
    }



    return (
        <div className="bg-white my-5 p-5 rounded-lg flex flex-col gap-5">
            <div className="flex justify-between gap-3">
                <div className="border border-black flex rounded-md py-2 px-2 w-full basis-1/2">
                    <input type="search" className="outline-none border-none w-full" placeholder="search keyword" value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} />
                    <Search />
                </div>
                <div className="w-full basis-1/4">
                    <select name="categories" id="" className="w-full p-3" value={category} onChange={(e: React.FormEvent<HTMLSelectElement>) => SetCategory(e.currentTarget.value)}>
                        <option>--Category--</option>
                        {categories.map((item, index) => (
                            <option key={index} className="capitalize">{item}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full basis-1/4">
                    <select name="categories" id="" className="w-full p-3" value={source} onChange={(e: React.FormEvent<HTMLSelectElement>) => setSource(e.currentTarget.value)}>
                        <option>--Source--</option>

                        {sources.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="border border-black flex rounded-md py-2 px-2 w-full basis-1/4">
                    <input type="date" className="w-full outline-none border-none" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetDate(e.target.value)} />
                </div>
            </div>
            <div className="flex gap-3 justify-end">
                <button className="bg-black text-white p-2 w-24 rounded-lg" onClick={searchAction}>Filter</button>
                <button className="bg-primary text-black p-2 w-24 rounded-lg" onClick={reset}>Reset</button>
            </div>

        </div>);
}