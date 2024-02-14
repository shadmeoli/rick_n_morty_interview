export interface SearchModalProps {
  title: string
}

export interface SearchProps {
  handleSearch: () => void;
  showAlert: boolean;
  value: string;
}


export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string | null; // Use string or null if the type can be null
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[]; // Array of episode URLs
  url: string;
  created: string; // Date string
}


export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // URL for the characters in the episode | I believe :(
  url: string;
  created: string;
}
