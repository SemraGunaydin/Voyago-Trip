import type { FC } from "react";
import { usePlaces } from "../../utils/service";
import { sortOptions } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";

const Filter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parametrelerini objeye çevir
  const params = Object.fromEntries(searchParams.entries());

  // filtrelere göre API isteği
  const { data } = usePlaces(params);

  const handleChange = (name: string, value: string) => {
    if (value) searchParams.set(name, value);
    else searchParams.delete(name);
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const locations = [...new Set(data?.map((i) => i.location))];

  return (
    <form className="flex flex-col gap-4 lg:gap-10 lg:mt-15 lg:sticky lg:top-10">
      <div className="field">
        <label htmlFor="location">Where to next?</label>
        <select
          className="input"
          name="location"
          id="location"
          value={params.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
        >
          <option value="">Select</option>
          {locations?.map((i, key) => (
            <option key={key} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="title">Search by accommodation type?</label>
        <input
          className="input"
          type="text"
          name="title"
          id="title"
          placeholder="e.g., Villa"
          value={params?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="sort">Order Type</label>
        <select
          className="input"
          name="sort"
          id="sort"
          value={params?.order || ""}
          onChange={(e) => handleChange("order", e.target.value)}
        >
          {sortOptions?.map((i, key) => (
            <option key={key} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>

        <button
          type="reset"
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-600 transition text-white mt-3 p-1 cursor-pointer rounded-md"
        >
          Reset History
        </button>
      </div>
    </form>
  );
};

export default Filter;
