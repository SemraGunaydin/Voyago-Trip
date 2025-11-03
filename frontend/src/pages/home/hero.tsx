import type  { FC } from 'react'


const Hero:FC = () => {
  return (
	<div className="hero  bg-cover h-[20vh] md:h-[30vh] grid place-items-center rounded-3xl p-5 ">
	  <div className="text-white text-center">
		<h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-5">Make your next reservation with Voyago</h1>
		<p className="md:text-lg lg:text-xl">Choose from more than two million hotels with filters to find your perfect fit.</p>
	  </div>
	</div>
  )
}

export default Hero;
