interface SearchAndSortProps {
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  search,
  setSearch,
  sort,
  setSort,
}) => {
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <select
          title="Sort order"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border">
          <option value="asc">Sort by title (A-Z)</option>
          <option value="desc">Sort by title (Z-A)</option>
          <option value="recent">Sort by recent</option>
        </select>
      </div>
    </>
  );
};

export default SearchAndSort;
