import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      // console.log(user);
      toast.success(
        "Account successfully created! Please verify from the new account from the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
