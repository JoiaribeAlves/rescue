export interface IShelter {
  name: string;
  address: {
    street: string;
    number: string;
    district: string;
    referencePoint: string | null;
    state: string;
    city: string;
  } | null;
}
