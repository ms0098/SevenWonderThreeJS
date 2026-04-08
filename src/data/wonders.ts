import greatWall from "@/assets/great-wall.jpg";
import petra from "@/assets/petra.jpg";
import christRedeemer from "@/assets/christ-redeemer.jpg";
import machuPicchu from "@/assets/machu-picchu.jpg";
import chichenItza from "@/assets/chichen-itza.jpg";
import colosseum from "@/assets/colosseum.jpg";
import tajMahal from "@/assets/taj-mahal.jpg";

export interface Wonder {
  id: string;
  name: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  year: string;
  description: string;
  image: string;
  fact: string;
}

export const wonders: Wonder[] = [
  {
    id: "great-wall",
    name: "Great Wall of China",
    location: "Beijing, China",
    country: "China",
    lat: 40.4319,
    lng: 116.5704,
    year: "7th century BC",
    description:
      "The Great Wall of China stretches over 13,000 miles across northern China. Built over centuries by multiple dynasties, it stands as the largest military structure ever built and a testament to human determination.",
    image: greatWall,
    fact: "If all the bricks were used to build a wall 5m high and 1m thick, it would circle the Earth.",
  },
  {
    id: "petra",
    name: "Petra",
    location: "Ma'an, Jordan",
    country: "Jordan",
    lat: 30.3285,
    lng: 35.4444,
    year: "312 BC",
    description:
      "Carved directly into vibrant red sandstone cliff faces, Petra was the capital of the Nabataean Kingdom. This archaeological wonder reveals an ancient civilization's mastery of water engineering and stone architecture.",
    image: petra,
    fact: "Only 15% of the city has been uncovered — 85% remains underground.",
  },
  {
    id: "christ-redeemer",
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    country: "Brazil",
    lat: -22.9519,
    lng: -43.2105,
    year: "1931",
    description:
      "Standing 98 feet tall atop Mount Corcovado, Christ the Redeemer watches over Rio de Janeiro with outstretched arms spanning 92 feet. This Art Deco masterpiece is the largest Art Deco sculpture in the world.",
    image: christRedeemer,
    fact: "The statue is struck by lightning an average of 3-5 times per year.",
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Cusco, Peru",
    country: "Peru",
    lat: -13.1631,
    lng: -72.545,
    year: "1450 AD",
    description:
      "Perched 7,970 feet above sea level in the Andes Mountains, Machu Picchu is a 15th-century Inca citadel. Its precisely cut stone walls, terraced fields, and astronomical observatories showcase incredible engineering.",
    image: machuPicchu,
    fact: "No wheels, iron tools, or mortar were used in its construction.",
  },
  {
    id: "chichen-itza",
    name: "Chichén Itzá",
    location: "Yucatán, Mexico",
    country: "Mexico",
    lat: 20.6843,
    lng: -88.5678,
    year: "600 AD",
    description:
      "Chichén Itzá was one of the largest Maya cities and a major focal point of the Maya Lowlands. El Castillo pyramid demonstrates the Maya's astronomical precision — during equinoxes, shadows create a serpent descending the stairs.",
    image: chichenItza,
    fact: "A handclap at the base produces an echo resembling the quetzal bird's chirp.",
  },
  {
    id: "colosseum",
    name: "Colosseum",
    location: "Rome, Italy",
    country: "Italy",
    lat: 41.8902,
    lng: 12.4922,
    year: "80 AD",
    description:
      "The Colosseum is the largest ancient amphitheatre ever built, holding 50,000–80,000 spectators. This icon of Imperial Rome hosted gladiatorial contests, public spectacles, and dramas based on mythology.",
    image: colosseum,
    fact: "It could be filled with water to stage mock naval battles called naumachiae.",
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, India",
    country: "India",
    lat: 27.1751,
    lng: 78.0421,
    year: "1653",
    description:
      "Built by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, the Taj Mahal is a masterpiece of Mughal architecture. Its white marble changes color throughout the day — pink at dawn, white by day, golden at sunset.",
    image: tajMahal,
    fact: "Over 20,000 artisans worked for 22 years, using materials from across Asia.",
  },
];
