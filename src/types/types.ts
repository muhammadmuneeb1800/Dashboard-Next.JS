import { IconType } from "react-icons";

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
  image?: string | null;
  publicId?: string | null;
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

export interface topBarDetails {
  title?: string;
  sabTitle?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  link?: string | undefined;
  onclick?: () => void;
}

export type ToastType = "success" | "error" | "loading" | "default";

export interface inputDetails {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  border?: string;
  borderColor?: string;
  id?: string;
  type?: string;
  placeholder?: string;
}

type LineChartData = {
  isOnline: number;
  startDate: string;
};

type PieChartData = {
  value: number;
  color: string;
};

export interface cardDetails {
  title?: string;
  number?: number;
  upAndDown?: string;
  img?: string | undefined;
  width?: number;
  icon?: IconType;
  chart: LineChartData[] | PieChartData[];
  type: string;
}

export interface button {
  text?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  bg: string;
  color: string;
  hBg: string;
  hColor: string;
  icon?: IconType;
  borderColor?: string;
  hBorderColor?: string;
  borderWidth?: string;
  width?: string;
}

export interface notification {
  id?: string;
  doctorId: string;
  data: string;
  createdAt?: Date;
}

export interface RawDataPoint {
  isOnline: boolean;
}

export interface RawDataPoint {
  isOnline: boolean;
  startDate: string;
}

export interface LineChartDataPoint {
  label?: string;
  value: number;
}

export interface RawDataPoint {
  isOnline: boolean;
  startDate: string;
}

export interface PieChartDataPoint {
  value: number;
  color?: string;
}

export type ChartData = RawDataPoint[] | PieChartDataPoint[];

export interface ChartComponentProps {
  type: "line" | "pie";
  data: ChartData;
  color?: string;
}

export interface CardDetails {
  title: string;
  number: number;
  upAndDown?: string;
  width?: number;
  icon?: React.ComponentType;
  chart: ChartData;
  type: "line" | "pie";
}
