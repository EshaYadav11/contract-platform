// The Lifecycle states required by the PDF 
export type ContractStatus = 'Created' | 'Approved' | 'Sent' | 'Signed' | 'Locked' | 'Revoked';

export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

// A "Blueprint" is a template [cite: 16]
export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  x: number; // For positioning
  y: number;
}

export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
}

// A "Contract" is the actual document [cite: 22]
export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  status: ContractStatus;
  createdDate: string;
  // This stores what the user types into the contract
  fieldValues: Record<string, string | boolean>; 
}