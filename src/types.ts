export type TreatmentCategory = 'all' | 'injectables' | 'laser' | 'facials' | 'body' | 'anti-aging';

export interface Treatment {
  id: string;
  name: string;
  category: 'injectables' | 'laser' | 'facials' | 'body' | 'anti-aging';
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  priceStartingAt: number;
  duration: string;
  downtime: string;
  longevity?: string;
  resultsDuration?: string;
  recommendedSessions?: string;
  targetConcerns: string[];
  benefits: string[];
  clinicalProtocol?: string;
  suitableFor?: string;
  doctorId?: string;
  doctorName?: string;
  doctorTitle?: string;
  image: string;
  isPopular?: boolean;
  featured?: boolean;
}

export type ProductCategory = 
  | 'all' 
  | 'serums' 
  | 'creams' 
  | 'cleansers' 
  | 'retinoids' 
  | 'spf' 
  | 'masks-peels' 
  | 'bundles' 
  | 'post-procedure';

export interface ProductActiveIngredient {
  name: string;
  percentage?: string;
  purpose: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  line: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  volume: string;
  shortDesc: string;
  fullDesc: string;
  activeIngredients: ProductActiveIngredient[];
  keyBenefits: string[];
  howToUse: string;
  clinicalResults?: string[];
  ingredientsList?: string;
  skinTypes: string[];
  targetConcerns: string[];
  inStock: boolean;
  stockCount: number;
  badge?: string;
  image: string;
  secondaryImage?: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  experienceYears: number;
  specialties: string[];
  specializations?: string[];
  bio: string;
  education?: string;
  image: string;
  rating: number;
  reviewsCount: number;
  locations: string[];
  clinicLocations?: string[];
  proceduresCount: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  treatmentName: string;
  category: string;
  patientAge: string;
  timeline: string;
  concerns: string[];
  doctorName: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  treatmentsUsed: string[];
}

export interface Review {
  id: string;
  name: string;
  author?: string;
  rating: number;
  isVerified?: boolean;
  verified?: boolean;
  treatment: string;
  type?: 'Treatment' | 'Skincare Product';
  subject?: string;
  comment: string;
  date: string;
  location: string;
  avatar?: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  features?: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  subtitle: string;
  pricePerMonth: number;
  perks: string[];
  isHighlighted?: boolean;
}

export interface BookingAppointment {
  id: string;
  treatmentId: string;
  treatmentName: string;
  doctorId: string;
  doctorName: string;
  location: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  concernsNote: string;
  depositPaid: number;
  status: 'CONFIRMED' | 'PENDING';
  bookingCode: string;
  prepInstructions?: string[];
  emailNotificationSent?: boolean;
  recipientEmail?: string;
  adminNotificationSent?: boolean;
}

export interface SkinQuizAnswers {
  primaryGoal: string;
  skinType: string;
  sensitivity: string;
  ageGroup: string;
  mainConcerns: string[];
  routinePreference: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  customerName: string;
  email: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  date: string;
  trackingNumber: string;
  selectedSamples: string[];
}
