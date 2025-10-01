import { useState } from "react";
import axios from "./axios";

export const useEmailValidator = () => {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = async (email: string) => {
    if (!email || !email.includes("@")) {
      setAvailable(null);
      return;
    }

    setChecking(true);
    setError(null);
    try {
      const res = await axios.get<{ exists: boolean }>(
        `/auth/check-email?email=${encodeURIComponent(email)}`
      );
      setAvailable(!res.data.exists); // true if available
    } catch (err: any) {
      setError("Could not verify email");
      setAvailable(null);
    } finally {
      setChecking(false);
    }
  };

  return {
    validateEmail,
    available,
    checking,
    error,
  };
};
