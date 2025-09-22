export type CatImage = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  breeds?: Breed[];
};

export type Breed = {
  id: string;
  name: string;
  description?: string;
  origin?: string;
  temperament?: string;
  life_span?: string;
  weight?: { metric?: string };
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  intelligence?: number;
  wikipedia_url?: string;
};

export type Favorite = {
  id: number;
  image_id: string;
  image?: CatImage;
};
