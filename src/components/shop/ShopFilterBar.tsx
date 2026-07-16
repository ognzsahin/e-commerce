import { LayoutGrid, List } from "lucide-react";

interface ShopFilterBarProps {
    totalResults: number;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    sortOrder: "popularity" | "high-to-low" | "low-to-high";
    setSortOrder: (order: "popularity" | "high-to-low" | "low-to-high") => void;
    onFilterClick: () => void;
}

function ShopFilterBar({ totalResults, viewMode, setViewMode, sortOrder, setSortOrder, onFilterClick }: ShopFilterBarProps) {

    return (

        <div className='flex flex-col items-center lg:flex-row lg:items-center lg:justify-between
                            w-full lg:w-[1050px] mx-auto
                                gap-[24px] lg:gap-[80px]
                                    lg:px-[195px] py-[24px]'>
            <span className='text-[#252B42] font-medium'>Showing all {totalResults} results</span>


            <div className="flex items-center gap-[15px]">
                <span className="text-[#252B42] font-medium">Views:</span>

                <button
                    type='button'
                    onClick={() => setViewMode('grid')}
                    className={`w-10 h-10 flex items-center justify-center border rounded
                        ${viewMode === "grid" ? "border-[#23A6F0]" : "border-gray-300"}`}
                >
                    <LayoutGrid size={20} strokeWidth={1.75} />
                </button>

                <button
                    type='button'
                    onClick={() => setViewMode('list')}
                    className={`w-10 h-10 flex items-center justify-center border rounded
                        ${viewMode === "list" ? "border-[#23A6F0]" : "border-gray-300"}`}
                >
                    <List size={20} />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "popularity" | "high-to-low" | "low-to-high")}
                    className="border border-gray-300 rounded px-4 py-2 text-[#252B42]"
                >
                    <option value="popularity">Popularity</option>
                    <option value="high-to-low">Yüksekten Düşüğe</option>
                    <option value="low-to-high">Düşükten Yükseğe</option>
                </select>

                <button
                    type="button"
                    onClick={onFilterClick}
                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-2"
                >
                    Filter
                </button>
            </div>
        </div>
    );
}

export default ShopFilterBar;