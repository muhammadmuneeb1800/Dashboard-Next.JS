export interface initialAuth {
  id?: string | undefined;
  name: string | undefined | null;
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
  createdAt?: Date | null;
  status: string | undefined;
}

export interface initialAppointment {
  id?: string | null;
  doctorId: string | null;
  doctorName: string | null;
  patientName: string | null;
  purposeOfVisit: string | null;
  appointmentStatus: string | null;
  startDate: Date | null;
  endDate: Date | null;
  appointmentType: string | null;
  isOnline: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}


export interface updatePasswordData {
  id: string;
  oldPassword: string;
  newPassword: string;
}