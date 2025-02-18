export interface initialAuth {
  id: string | undefined;
  userName: string | undefined | null;
  email: string | undefined;
  companyName: string | undefined | null;
}

export interface InitialData {
  id?: string | null;
  name?: string | null;
  surName?: string | null;
  diagnosis?: string | null;
  status?: string | null;
  dateTime?: string | null;
  dob?: Date | string | null;
  sex?: string | null;
  notes?: string | null;
  phoneNumber?: string | null;
}
