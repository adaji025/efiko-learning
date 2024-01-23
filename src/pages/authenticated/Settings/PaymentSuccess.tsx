import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmTransaction } from "../../../services/transaction";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProfileTypes } from "../../../types/auth";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const location = useLocation();
  const uuid = location.search.split("uuid=")[1];

  const navigate = useNavigate();
  const { handleError } = useNotification();
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  useEffect(() => {
    confirmTransaction(userData._id, uuid)
      .then(() => {
        toast.success("payment successful");
        navigate("/payments");
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);
  return (
    <div className="flex h-[calc(100vh-10px)] w-full justify-center items-center">
      <div className="text-2xl text-center font-semibold">
        Payment successful
      </div>
    </div>
  );
};

export default PaymentSuccess;
