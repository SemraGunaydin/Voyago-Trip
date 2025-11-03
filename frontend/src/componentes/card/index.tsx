import type { FC } from "react";
import type { Place } from "../../types";
import { Link } from "react-router-dom";
import Rating from "./rating";
import Status from "./status";

interface Props {
  place: Place;
}

const Card: FC<Props> = ({ place }) => {
  // Güvenli resim yolu oluşturucu
  const imageSrc =
    place.image_url?.startsWith("http")
      ? place.image_url
      : `/${place.image_url?.replace(/^\/?/, "") || "default.jpg"}`;

  return (
    <Link
      to={`/place/${place.id}`}
      className="border border-zinc-300 rounded-md p-4 gap-4 grid grid-cols-3 min-h-[300px] hover:shadow-md"
    >
      {/* Image part */}
      <div>
        <img
          src={imageSrc}
          alt={place.name}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default.jpg";
          }}
        />
      </div>

      <div className="col-span-2 flex flex-col justify-between">
        {/* Intro */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">{place.name}</h1>
            <Status availability={place.availability} />
          </div>

          <p>{place.location}</p>

          <div className="flex gap-4 mb-2">
            {Array.isArray(place.amenities) &&
              place.amenities.slice(0, 2).map((i, key) => (
                <span
                  key={key}
                  className="border py-1 px-2 rounded-md border-zinc-200 text-nowrap line-clamp-1"
                >
                  {i}
                </span>
              ))}
          </div>

          <Rating rating={place.rating} expand={false} />
        </div>

        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold">${place.price_per_night}</span>
          <span className="text-xs text-gray-400">All Inclusive</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
