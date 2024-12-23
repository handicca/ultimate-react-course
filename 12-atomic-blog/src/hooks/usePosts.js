import { useContext } from "react";
import PostContext from "../context/PostContext";

const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("PostContext was used outside of the Provider!");
  }
  return context;
};

export default usePosts;
