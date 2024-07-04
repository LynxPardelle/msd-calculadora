export interface Products {
  idProduct: number;
  productName: string;
  pmp: number;
  suggestedPrice: number;
  unit: number;
  pmpTotalAmount: number;
  suggestedPriceTotalAmount: number;
  itemDiscount: number;
  itemPrice: number;
  transferPriceTotalAmount: number;
}

export interface ProductsQuotation {
  montoTotalHospitalPmp: number;
  montoTotalPrecioSugerido: number;
  variacionDescuento: number;
  variacionDescuentoSugerido: number;
  montoTotalNotaDeCredito: number;
  montoTotalPrecioTransfer: number;
  objetivoTrimestral: number;
  cobertura: number;
}

export interface Offer {
  id: number;
  img: string;
  category: string[];
  txt1: string;
  txt2: string;
  txt3: string;
}

export interface TopClients {
  unit: number;
  objective: number;
  comercialPlan: number;
  totalNC: number;
  ncPeerPiece: number;
}
