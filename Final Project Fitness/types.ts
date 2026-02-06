export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  features: string[];
  price: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image: string;
  result: string;
}

export interface NavItem {
  label: string;
  path: string;
}
