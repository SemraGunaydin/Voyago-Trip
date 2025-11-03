const sortOptions = [
	{ label: "Select", value: "" },
	{
	  label: "Cheapest",
	  value: "Price-Asc",
	},
	{
	  label: "Most Expensive",
	  value: "Price-Desc",
	},
	{
	  label: "Highest Rating",
	  value: "Rating-Desc",
	},
	{
	  label: "Lowest Rating",
	  value: "Rating-Asc",
	},
  ];
  
  // initial form values
  const initialValues = {
	name: "",
	location: "",
	address: "",
	description: "",
	amenities: "",
	rating: "",
	price_per_night: "",
	availability: false,
  };
  
  // input fields
  const inputFields = [
	{ label: "Name", name: "name", placeholder: "Seaside Villa" },
	{ label: "Location", name: "location", placeholder: "Istanbul" },
	{ label: "Address", name: "address", placeholder: "Kadikoy" },
	{ label: "Description", name: "description", placeholder: "A beautiful villa" },
	{ label: "Amenities", name: "amenities", placeholder: "Wifi, Parking" },
	{ label: "Rating", name: "rating", placeholder: "4.5" },
	{ label: "Price per Night", name: "price_per_night", placeholder: "1000" },
	{
	  label: "Availability (Are rooms available?)",
	  name: "availability",
	  type: "checkbox",
	},
  ];
  
  export { sortOptions, initialValues, inputFields };
  