import { Fragment, useEffect, useState } from "react";
import { Button, LoadingOverlay } from "@mantine/core";
import SubscriptionCard from "./components/SubscriptionCard";
import { SubscriptionTypes } from "../../../types/admins/subscription";
import { getAllSbubscritions } from "../../../services/admin/subscription";
import useNotification from "../../../hooks/useNotification";
import { getPayments } from "../../../services/transaction";
import { PaymentState } from "../../../types/payment";
import PaymentsTable from "./components/PaymentsTable";
import TableSkeleton from "../../../components/TableSkeleton";
import { useDisclosure } from "@mantine/hooks";
import { ProfileTypes } from "../../../types/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search] = useState("");
  const [subscriptions, setSubscriptions] = useState<SubscriptionTypes[]>([]);
  const [payments, setPayments] = useState<PaymentState | null>(null);
  const [opened, { open, close }] = useDisclosure(false);


  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const { handleError } = useNotification();
  useEffect(() => {
    handleGetSubscriptions();
    handleGetPayment();
  }, []);

  const handleGetSubscriptions = () => {
    setLoading(true);
    getAllSbubscritions()
      .then((res: any) => {
        setSubscriptions(res.data.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetPayment = () => {
    getPayments(limit, skip, search, userData._id)
      .then((res: any) => {
        setPayments(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Payments
        </div>

        <div className="mt-10 px-4 lg:px-10">
          <div className="mt-5 flex justify-end">
            <Button size="md" className="bg-primary" onClick={open}>
              Make Payment
            </Button>
          </div>

          <SubscriptionCard
            opened={opened}
            close={close}
            subscriptions={subscriptions}
          />

          {!loading && (
            <PaymentsTable
              payments={payments}
              limit={limit}
              skip={skip}
              setSkip={setSkip}
            />
          )}

          {loading && <TableSkeleton />}
        </div>
      </div>
    </Fragment>
  );
};

export default Payments;
