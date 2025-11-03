const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const places = [
	{
		"id": 2,
		"name": "Mountain Retreat",
		"location": "Austria",
		"address": "Alpine Road 789",
		"description": "Perfect for nature lovers a peaceful retreat in the Austrian Alps.",
		"amenities": ["Free WiFi", "Hiking Trails", "Fireplace", "Pet Friendly"],
		"rating": 4.5,
		"price_per_night": 120,
		"availability": true,
		"image_url": "/pic2.jpg"
	  },
	  {
		"id": 3,
		"name": "City Center Apartment",
		"location": "Germany",
		"address": "Alexanderplatz 456",
		"description": "Modern apartment located in the heart of Berlin.",
		"amenities": ["Free WiFi", "Kitchen", "Air Conditioning", "Washer/Dryer"],
		"rating": 4.2,
		"price_per_night": 90,
		"availability": false,
		"image_url": "/pic3.jpg"
	  },
	  {
		"id": 4,
		"name": "Seaside Villa",
		"location": "France",
		"address": "Promenade des Anglais 321",
		"description": "Beautiful villa with private beach access and a breathtaking sea view.",
		"amenities": ["Free WiFi", "Private Beach", "Swimming Pool", "BBQ Area"],
		"rating": 4.9,
		"price_per_night": 200,
		"availability": true,
		"image_url": "/pic4.jpg"
	  },
	  {
		"id": 5,
		"name": "Budget Hostel",
		"location": "Portugal",
		"address": "Rua da Liberdade 654",
		"description": "Affordable hostel close to Lisbon’s main attractions.",
		"amenities": ["Free WiFi", "Shared Kitchen", "Laundry", "Common Lounge"],
		"rating": 3.8,
		"price_per_night": 25,
		"availability": true,
		"image_url": "/pic5.webp"
	  },
	  {
		"id": 6,
		"name": "Villa with Pool",
		"location": "Spain",
		"address": "Carrer de Mallorca 112",
		"description": "A spacious villa with a private pool and sunny terrace.",
		"amenities": ["Cinema", "Swimming Pool", "WiFi", "Breakfast"],
		"rating": 4.1,
		"price_per_night": 350,
		"availability": true,
		"image_url": "/pic6.png"
	  },
	  {
		"id": 7,
		"name": "Bungalow",
		"location": "Netherlands",
		"address": "Canal Street 58",
		"description": "Cozy bungalow overlooking Amsterdam’s canals.",
		"amenities": ["Cinema", "Swimming Pool", "WiFi"],
		"rating": 4.5,
		"price_per_night": 222,
		"availability": true,
		"image_url": "pic7.webp"
	  },
	  {
		"id": 8,
		"name": "Detached Villa with Pool",
		"location": "Greece",
		"address": "Poseidon Avenue 22",
		"description": "Elegant detached villa with pool and sea view near the Aegean coast.",
		"amenities": ["WiFi", "Swimming Pool", "Air Conditioning"],
		"rating": 4.3,
		"price_per_night": 122,
		"availability": true,
		"image_url": "pic8.webp"
	  },
	  {
		"id": 9,
		"name": "Mountain House",
		"location": "Switzerland",
		"address": "Lauterbrunnen Valley 1236",
		"description": "A peaceful mountain house surrounded by the Swiss Alps.",
		"amenities": ["Forest View", "Hiking Area"],
		"rating": 3.3,
		"price_per_night": 455,
		"availability": false,
		"image_url": "pic9.webp"
	  }
];

app.get("/", (req, res) => {
  res.send("🏨 Backend is running!");
});

app.get("/place", (req, res) => {
	let results = [...places]; // orijinal listeyi bozmayalım
  
	const { location, title, order } = req.query;
  
	// 🔹 Filtreleme
	if (location) {
	  results = results.filter(
		(item) => item.location.toLowerCase() === location.toLowerCase()
	  );
	}
  
	if (title) {
	  // isim veya açıklamada arama
	  results = results.filter(
		(item) =>
		  item.name.toLowerCase().includes(title.toLowerCase()) ||
		  item.description.toLowerCase().includes(title.toLowerCase())
	  );
	}
  
	// 🔹 Sıralama
	if (order) {
	  const normalized = order.toLowerCase();
  
	  if (normalized === "price-asc") {
		results.sort((a, b) => a.price_per_night - b.price_per_night);
	  } else if (normalized === "price-desc") {
		results.sort((a, b) => b.price_per_night - a.price_per_night);
	  } else if (normalized === "rating-asc") {
		results.sort((a, b) => a.rating - b.rating);
	  } else if (normalized === "rating-desc") {
		results.sort((a, b) => b.rating - a.rating);
	  }
	}
  
	res.json(results);
  });

  // ✅ Yeni rota: detay sayfası için
app.get("/place/:id", (req, res) => {
	const { id } = req.params;
	const place = places.find((p) => p.id === Number(id));
  
	if (!place) {
	  return res.status(404).json({ message: "Place not found" });
	}
  
	res.json({ place });
  });
  app.post("/place", async (req, res) => {
	console.log("POST /place çağrıldı:", req.body);
  
	try {
	  const newPlace = {
		id: Date.now(),
		...req.body,
		// amenity string ise split ile diziye çevir
		amenities: Array.isArray(req.body.amenities)
		  ? req.body.amenities
		  : req.body.amenities?.split(",").map((a) => a.trim()) || [],
		// ⚡ image_url boşsa varsayılan görsel kullan
		image_url: req.body.image_url && req.body.image_url.trim() !== ""
		  ? req.body.image_url
		  : "/default.jpg",
	  };
  
	  places.push(newPlace);
	  console.log("Yeni place eklendi:", newPlace);
  
	  res.status(201).json({ place: newPlace });
	} catch (err) {
	  console.error("POST /place hata:", err);
	  res.status(500).json({ error: err.message });
	}
  });
  
  

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));