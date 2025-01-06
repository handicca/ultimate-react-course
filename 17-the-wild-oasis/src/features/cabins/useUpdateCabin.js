import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isEditing };
}
