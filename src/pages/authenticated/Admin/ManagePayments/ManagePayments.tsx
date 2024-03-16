import { useEffect, useState } from "react";
import { getAllPayments } from "../../../../services/transaction";
import useNotification from "../../../../hooks/useNotification";
import { PaymentState } from "../../../../types/payment";
import PaymentsTable from "./components/PaymentsTable";
import TableSkeleton from "../../../../components/TableSkeleton";

const ManagePayments = () => {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(1);
  const [search] = useState("");
  const [payments, setPayments] = useState<PaymentState | null>(null);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetPayment();
  }, [limit, skip, search]);

  const handleGetPayment = () => {
    setLoading(true);
    getAllPayments(limit, skip, search)
      .then((res: any) => {
        setPayments(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Payments
      </div>

      <div className="px-4 lg:px-10">
        {!loading && (
          <PaymentsTable
            payments={payments}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
            setLimit={setLimit}
          />
        )}

        {loading && <TableSkeleton />}
      </div>
    </div>
  );
};

export default ManagePayments;
