import type { FC } from "react";



interface Props {
	rating:number;
	expand:boolean;
}
const Rating:FC<Props> =({rating, expand}) => {
	const color:string = rating >=4.7 ? "bg-blue-500" : rating >= 4 ? "bg-green-500" : rating >=3 ? "bg-yellow-500" : "bg-red-500";

	const text = 
	rating >=4.7 ? "Amazing" : rating >= 4 ? "Very Good" : rating >=3 ? "Good" : "Poor";

	return (
		<div>
			<span className={`${color} text-white p-2 rounded-lg font-bold `}>
				{Number(rating).toFixed(1)}
			</span>

			{expand && <span className="font-semibold text-lg ms-2 ">{text}</span>}
		</div>
	)
}

export default Rating;