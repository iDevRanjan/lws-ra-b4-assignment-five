import { Search } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function SearchInput({
    queryObject,
    handleSetQuerySearch,
    clearFiltersKey,
}) {
    const searchInputRef = useRef(null);

    function handleClick() {
        const sanitizedValue = searchInputRef.current.value.trim();

        if (queryObject.search === sanitizedValue) {
            toast("ℹ️ No search query are available");
            return;
        }

        handleSetQuerySearch(sanitizedValue);
    }

    return (
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="focus-within:ring-primary flex-1 place-content-center rounded-md ring ring-transparent transition-all">
                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                        key={clearFiltersKey}
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search jobs by title, skill..."
                        className="input w-full border-none pl-10 outline-none"
                    />
                </div>
            </div>
            <button
                onClick={handleClick}
                className="btn btn-primary flex gap-2"
            >
                <Search className="mr-2 h-4 w-4" />
                Search Jobs
            </button>
        </div>
    );
}
