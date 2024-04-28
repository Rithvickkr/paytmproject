import { Toaster } from "react-hot-toast";
import { SendCard } from "../../../components/SendCard";

export default function () {
  return (
    <div className="w-full">
      <div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              padding: "16px",
            },
          }}
        />
      </div>

      <SendCard />
    </div>
  );
}
