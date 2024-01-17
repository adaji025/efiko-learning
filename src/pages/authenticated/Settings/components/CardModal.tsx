import { Button, Modal } from "@mantine/core";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

type IProps = {
  opened: boolean;
  close: () => void;
  clientSecret: any;
};

const CardModal = ({ close, opened, clientSecret }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const stripePromise = loadStripe(
    import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
  );

  const options = {
    clientSecret,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error }: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message);
    }

    setLoading(false);
    close();
  };

  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
      opened={opened}
      onClose={close}
    >
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentElement />
          <div className="mt-5">{message}</div>
          <div className="flex justify-end mt-5">
            <Button
              loading={loading}
              disabled={!stripe && loading}
              size="md"
              className="bg-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Payment
            </Button>
          </div>
        </Elements>
      )}
    </Modal>
  );
};

export default CardModal;
