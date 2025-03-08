"use client";
import { showToast } from "@/components/toast/Toast";
import {
  addPatientData,
  fetchPatientsData,
  updatePatientDataThunk,
} from "@/store/slices/patientSlice";
import { useAppDispatch } from "@/store/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAddPatient() {
  const [foreName, setForeName] = useState<string>();
  const [surName, setSurname] = useState<string>();
  const [dob, setDob] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [diagnosis, setDiagnosis] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [image, setImage] = useState<string | File | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePatient, setActivePatient] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const doctorId = session?.user?.id;
  const router = useRouter();

  const handleClick = (id: string) => {
    setActivePatient(activePatient === id ? null : id);
    setActive(!active);
  };

  const close = () => {
    setIsOpen(!isOpen);
  };

  const formValidation = async () => {
    if (!foreName?.trim()) {
      showToast("error", "Forename is required");
      setIsLoading(false);
      return false;
    }
    if (!surName?.trim()) {
      showToast("error", "Surname is required");
      setIsLoading(false);
      return false;
    }
    if (!diagnosis?.trim()) {
      showToast("error", "Diagnosis is required");
      setIsLoading(false);
      return false;
    }
    if (!status?.trim()) {
      showToast("error", "Status is required");
      setIsLoading(false);
      return false;
    }
    if (!dob) {
      showToast("error", "Date of birth is required");
      setIsLoading(false);
      return false;
    }
    const validGenders = ["Male", "Female"];
    if (!validGenders.includes(gender as string)) {
      showToast("error", "Sex is Require (Male) & (Female)");
      setIsLoading(false);
      return false;
    }
    if (!phoneNumber?.trim()) {
      showToast("error", "Phone number is required");
      setIsLoading(false);
      return false;
    } else if (!/^\d{10,15}$/.test(phoneNumber)) {
      showToast("error", "Phone number must be 10-15 digits");
      setIsLoading(false);
      return false;
    }
    if (!appointmentDate) {
      showToast("error", "Appointment date is required");
      setIsLoading(false);
      return false;
    } else {
      const appointment = new Date(appointmentDate);
      if (appointment < new Date()) {
        showToast("error", "Appointment date must be in the future");
        setIsLoading(false);
        return false;
      }
    }
    return true;
  };

  const uploadImageToCloudinary = async (image: File) => {
    try {
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
      );
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );
      return {
        url: response.data.secure_url as string,
        publicId: response.data.public_id as string,
      };
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = await formValidation();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    try {
      let imageURL: { url: string; publicId: string } = {
        url: "",
        publicId: "",
      };
      if (image) {
        const uploadedImage = await uploadImageToCloudinary(image as File);
        imageURL = uploadedImage ?? { url: "", publicId: "" };
      }
      const patientData = {
        doctorId: doctorId,
        foreName: foreName,
        surName: surName,
        dob: dob,
        sex: gender,
        diagnosis: diagnosis,
        status: status?.replace(" ", "_"),
        appointmentDate: appointmentDate,
        phoneNumber: phoneNumber,
        image: imageURL.url,
        publicId: imageURL.publicId,
      };
      const result = await dispatch(addPatientData(patientData));
      if (result) {
        showToast("success", "Patient added successfully");
        router.push("/dashboard/patients");
      } else {
        showToast("error", "Failed to add patient");
      }
    } catch (error) {
      console.log("Error from the useAdd Patients", error);
    }
    setForeName("");
    setSurname("");
    setDob("");
    setGender("");
    setDiagnosis("");
    setStatus("");
    setPhoneNumber("");
    setStatus("");
    setAppointmentDate(null);
  };

  const handleUpdate = async (
    e: React.FormEvent,
    id: string,
    close: () => void
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = await formValidation();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    try {
      let imageURL: { url: string; publicId: string } = {
        url: "",
        publicId: "",
      };
      if (image) {
        const uploadedImage = await uploadImageToCloudinary(image as File);
        imageURL = uploadedImage ?? { url: "", publicId: "" };
      }
      const patientData = {
        id,
        doctorId,
        foreName,
        surName,
        dob,
        sex: gender,
        diagnosis,
        status: status?.replace(" ", "_"),
        appointmentDate,
        phoneNumber,
        image: imageURL.url,
        publicId: imageURL.publicId,
      };
      const res = await dispatch(updatePatientDataThunk(patientData));
      if (res?.payload?.success) {
        showToast("success", "Patient Updated successfully");
        await dispatch(fetchPatientsData());
      }
    } catch (error) {
      console.log("Error updating patient:", error);
    } finally {
      close();
      setIsLoading(false);
    }
    setForeName("");
    setSurname("");
    setDob("");
    setGender("");
    setDiagnosis("");
    setStatus("");
    setPhoneNumber("");
    setAppointmentDate(null);
  };

  return {
    foreName,
    setForeName,
    surName,
    setSurname,
    dob,
    setDob,
    setGender,
    gender,
    diagnosis,
    setDiagnosis,
    setStatus,
    status,
    phoneNumber,
    setPhoneNumber,
    appointmentDate,
    isLoading,
    dispatch,
    router,
    image,
    setImage,
    setAppointmentDate,
    handleAddPatient,
    handleUpdate,
    active,
    setActive,
    isOpen,
    setIsOpen,
    activePatient,
    setActivePatient,
    handleClick,
    close,
  };
}
