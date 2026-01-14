export interface Asset {
  id: number;
  addmissionDate: string;
  brand: string;
  capacity: number;
  component: string;
  criticality: string;
  date: string;
  egressDate: string;
  element: string;
  equipment: string;
  function: string;
  labelId: string;
  location: string;
  lowReason: string;
  lubricant: string;
  lubricantType: string;
  measureUnit: string;
  model: string;
  observations: string;
  oilAnalisys: boolean;
  plantTag: string;
  review: number;
  routes: string; //este atributo esta en json
  sector: string;
  state: boolean;
  suggestedQuantity: string;
  supplies: string; //este tambien es json
  tagFP: string;
  tagTGD: string;
  tagTGDBefore: string;
  type: string;
  // Add more fields as needed based on your API response
}

export interface UpdateAssetDto {
  data: Asset;
  // Add more fields as needed
}
