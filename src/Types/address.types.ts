export interface AddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface Address extends AddressPayload {
  _id: string;
}

export interface AddressesApiResponse {
  status: string;
  message?: string;
  data: Address[];
}

export interface SingleAddressApiResponse {
  status: string;
  data: Address;
}
