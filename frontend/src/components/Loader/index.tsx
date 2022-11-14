import { useSelector } from "react-redux";
import { Store } from "../../types";

import "./Loader.css";

function Loader() {
  const { loading } = useSelector((store: Store) => store);

  return (
    <div className={`Loader ${loading && "visible"}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
