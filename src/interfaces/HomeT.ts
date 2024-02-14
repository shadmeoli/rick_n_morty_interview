export interface SearchModalProps {
  title: string
}

export interface SearchProps {
  handleSearch: () => void;
  showAlert: boolean;
  value: string;
}
