import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    // mutationFn: (id) => deleteCabins(id),
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabin, isDeleting };
}
