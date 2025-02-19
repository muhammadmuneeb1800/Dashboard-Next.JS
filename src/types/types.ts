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
  dob?: string | null;
  sex?: string | null;
  diagnosis?: string | null;
  status?: string | null;
  appointmentDate?: Date | null;
  phoneNumber?: string | null;
}
