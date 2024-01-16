import { Fragment, useEffect, useState } from "react";
import { Button, LoadingOverlay } from "@mantine/core";
import SubscriptionCard from "./components/SubscriptionCard";
import { SubscriptionTypes } from "../../../types/admins/subscription";
import { getAllSbubscritions } from "../../../services/admin/subscription";
import useNotification from "../../../hooks/useNotification";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<SubscriptionTypes[]>([]);
  const [cards, setCards] = useState(false);

  const stripePromise = loadStripe(
    import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
  );

  const { handleError } = useNotification();
  useEffect(() => {
    handleGetSubscriptions();
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

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   if (clientSecret) {
  //     const { error }: any = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     });
  //   }
  //   // Handle payment result
  // };

  return (
    <Elements stripe={stripePromise}>
      <Fragment>
        <LoadingOverlay visible={loading} />
        <div className="mt-[50px] lg:mt-5">
          <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
            Payments
          </div>

          <div className="mt-10 px-4 lg:px-10">
            <div className="flex gap-2">
              <h3 className="font-medium">Subscription</h3>
              <div>Weekly</div>
            </div>
            <div className="mt-5">
              <Button
                size="md"
                className="bg-primary"
                onClick={() => setCards(true)}
              >
                Add Payment
              </Button>
            </div>
            <div className="mt-10">
              {cards && <SubscriptionCard subscriptions={subscriptions} />}
            </div>
          </div>
        </div>
      </Fragment>
    </Elements>
  );
};

export default Payments;
