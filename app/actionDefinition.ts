enum workspace {
  house,
  apartment,
}

type user = {
  //children_count: 0,

  sqm_min: number;
  sqm_max: number;
  obj_type: workspace; //or "house"

  workplace: string;
  workplace_lat: number;
  workplace_lon: number;
  city: string;

  self_capital: number;
  income: number;
  state: string; //everything else is disgusting (nrw is okay because leonardo might live there)
  payment_rate: number;
  weights: weightOrMetric;
  max_distances: weightOrMetric;
};

type weightOrMetric = {
  workplace: number;
  school: number;
  publicTransport: number;
  kindergarden: number;
  supermarket: number;
};

type listing_address = {
  "ISO_3166-1_alpha-2": string;
  "ISO_3166-1_alpha-3": string;
  _category: string;
  _type: string;
  city: string;
  continent: string;
  country: string;
  country_code: string;
  political_union: string;
  postcode: string;
  state: string;
  state_code: string;
  suburb: string;
  lat: number;
  lon: number;
  displayName: string;
};

type listing_locationFactor_populationTrend = {
  from: number;
  to: number;
};

type listing_locationFactor_microLocation_schools_address = {
  country: string;
  city: string;
  housenumber: string;
  street: string;
  postcode: string;
};

type listing_locationFactor_microLocation_schools = {
  address: listing_locationFactor_microLocation_schools_address;
  distance: number;
  name: string;
};

type listing_locationFactor_microLocation_supermarkets_address = {
  city: string;
  housenumber: string;
  street: string;
  postcode: string;
};

type listing_locationFactor_microLocation_supermarkets = {
  address: listing_locationFactor_microLocation_supermarkets_address;
  distance: number;
  name: string;
  openingHours: string;
};

type listing_locationFactor_microLocation_kindergarten_contact = {
  website: string;
  phone: string;
  fax: string;
};

type listing_locationFactor_microLocation_kindergarten = {
  address: listing_locationFactor_microLocation_supermarkets_address;
  distance: number;
  maxAge: string;
  contact: listing_locationFactor_microLocation_kindergarten_contact;
  minAge: string;
  name: string;
  openingHours: string;
};

type listing_locationFactor_microLocation_publicTransport = {
  distance: number;
  name: string;
  operator: string;
  transportTypes: string[];
  network: string;
};

type listing_locationFactor_microLocation = {
  schools?: listing_locationFactor_microLocation_schools[];
  supermarkets?: listing_locationFactor_microLocation_supermarkets[];
  kindergarten?: listing_locationFactor_microLocation_kindergarten[];
  publicTransport?: listing_locationFactor_microLocation_publicTransport[];
};

type listing_locationFactor_unemploymentRateOrPopulationMeta_historicValues = {
  [key: string]: number;
};

type listing_locationFactor_unemploymentRateOrPopulationMeta = {
  historicValues: listing_locationFactor_unemploymentRateOrPopulationMeta_historicValues;
};

type listing_locationFactor = {
  population: number;
  populationTrend: listing_locationFactor_populationTrend;
  hasUniversity: boolean;
  unemploymentRate: number;
  numberOfStudents: number;
  score: number;
  unemploymentRateScore: number;
  universityScore: number;
  populationScore: number;
  populationTrendScore: number;
  microLocation?: listing_locationFactor_microLocation;
  unemploymentRateMeta: listing_locationFactor_unemploymentRateOrPopulationMeta;
  populationMeta: listing_locationFactor_unemploymentRateOrPopulationMeta;
};

type listing_location = {
  lat: number;
  lon: number;
};

type listing_platforms = {
  name: string;
  id: string;
  url: string;
  creationDate: string;
  publishDate: string;
  active: boolean;
};

type listing_aggregations_districtOrLocationOrSimilarListing = {
  name: string;
  buyingPrice: number;
  pricePerSqm: number;
  grossReturn: number;
};

type listing_aggregations = {
  district: listing_aggregations_districtOrLocationOrSimilarListing;
  location: listing_aggregations_districtOrLocationOrSimilarListing;
  similarListing: listing_aggregations_districtOrLocationOrSimilarListing;
};

type listing_oAddress_immosocial24 = {
  street: unknown;
  postcode: string;
  location: string;
};

type listing_oAddress = {
  immosocial24: listing_oAddress_immosocial24;
};

type listing_originalAddress = {
  street: string;
  postcode: string;
  location: string;
};

type listing_images = {
  id: string;
  originalUrl: string;
  title: string;
};

type listing_buyingPriceHistory = {
  buyingPrice: number;
  platformName: string;
  creationDate: string;
};

type listing = {
  id: string;
  title: string;
  realtorCompany: string;
  zip: string;
  buyingPrice: number;
  squareMeter: number;
  comission: string; //TODO: find out type
  platforms: listing_platforms[];
  rentPricePerSqm: number;
  pricePerSqm: number;
  rentPrice: number;
  rentPriceCurrent: number;
  rentPriceCurrentPerSqm: number;
  address: listing_address;
  energyCertificate: boolean;
  region: string;
  foreClosure: boolean;
  locationFactor?: listing_locationFactor;
  grossReturn: number;
  grossReturnCurrent?: number;
  constructionYear?: number;
  condition?: string;
  lastRefurbishment?: string;
  numberOfFloors?: number;
  cellar?: boolean;
  numberOfParkingSpaces?: number;
  heatingType?: string;
  active?: boolean;
  rented?: boolean;
  location: listing_location;
  publishDate?: string;
  buildingType?: string;
  plotArea?: number;
  rooms?: number;
  privateOffer?: boolean;
  aggregations?: listing_aggregations;
  livingUnits?: number;
  commercialUnits?: number;
  leasehold?: boolean;
  priceInMarket: number;
  constructionPhase?: string;
  oAddress?: listing_oAddress;
  originalAddress?: listing_originalAddress;
  images?: listing_images[];
  buyingPriceHistory?: listing_buyingPriceHistory[];
  priceReduced?: boolean;
  priceIncreased?: boolean;
  runningTime?: number;
  lastUpdatedAt?: string;
  favorite?: number;
  favoriteDate?: string;
  cashFlow?: number;
  ownCapitalReturn?: number;
  cashFlowPerLivingUnit: number;
  workplaceDistance?: number;
  customMetric?: number;
};

export type {
  listing,
  user,
  weightOrMetric,
  listing_address,
  listing_aggregations,
  listing_locationFactor_microLocation_kindergarten,
  listing_locationFactor_microLocation_publicTransport,
  listing_locationFactor_microLocation_supermarkets,
  listing_locationFactor_microLocation_schools,
};

export { workspace };
