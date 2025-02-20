export interface initialAuth {
  id: string | undefined;
  userName: string | undefined | null;
  email: string | undefined;
  companyName: string | undefined | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  emailVerified?: Date | null;
}

export interface InitialData {
  id?: string | null;
  doctorId?: string | null;
  foreName?: string | null;
  surName?: string | null;
  dob?: string | null;
  sex?: string | null;
  diagnosis?: string | null;
  status?: string | null;
  appointmentDate?: Date | null;
  phoneNumber?: string | null;
}

export interface taskData {
  id?: string | null;
  doctorId?: string | null;
  title: string | null;
  description: string | null;
  status: string | null;
}
