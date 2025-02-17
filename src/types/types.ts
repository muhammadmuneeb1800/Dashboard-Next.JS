export interface initialAuth {
  id: string | undefined;
  userName: string | undefined | null;
  email: string | undefined;
  companyName: string | undefined | null;
}

export interface initilaData {
  id: string | null;
  name: string | null;
  diagnosis: string | null;
  status: string | null;
  dateTime: Date | null;
  dob: Date | null;
  sex: string | null;
  notes: string | null;
  phoneNumber: string | null;
}
