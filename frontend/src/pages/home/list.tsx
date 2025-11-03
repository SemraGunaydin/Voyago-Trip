
import type { FC } from "react";
import { usePlaces } from "../../utils/service.ts";
import Card from "../../componentes/card/index.tsx";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "../../types/index.ts";
import Loader from "../../componentes/loader/index.tsx";
import Error from "../../componentes/error/index.tsx";



const List: FC = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const { isLoading, error, data, refetch } = usePlaces(paramsObject as FilterParams);

  if (isLoading) return <Loader/>
  if (error) return <Error message={error.message} refetch={refetch}/>

  return (
    <div className="mt-10">
      <h1 className="font-bold text-2xl">Nearest Location</h1>

      <div className="grid gap-5 mt-5">
        {!data || data?.length === 0 ? (
          <div>
            <p>No results were found matching your criteria.</p>
          </div>
        ) : (
          data?.map((place) => <Card key={place.id} place={place} />)
        )}
      </div>
    </div>
  );
};

export default List;