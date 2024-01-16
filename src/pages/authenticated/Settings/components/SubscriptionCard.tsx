import { Button, LoadingOverlay, Select } from "@mantine/core";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../../types/auth";
import { RootState } from "../../../../redux/store";
import { SubscriptionTypes } from "../../../../types/admins/subscription";
import { Fragment, useEffect, useState } from "react";
import { initiateTransaction } from "../../../../services/transaction";
import { useForm } from "@mantine/form";

import CardModal from "./CardModal";
import { useDisclosure } from "@mantine/hooks";

type IProps = {
  subscriptions: SubscriptionTypes[];
};
const SubscriptionCard = ({ subscriptions }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [payload, setPayload] = useState<SubscriptionTypes | null>(null);
  const [currencyValue, setCurrencyValue] = useState<string | null>("");
  const [clientSecret, setClientSecret] = useState<any>(null);
  const [_, setTransactionID] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  useEffect(() => {
    subscriptions.filter((item: SubscriptionTypes) => {
      if (item._id === value) {
        setPayload(item);
      }
    });
  }, [value]);

  const form = useForm({
    initialValues: {
      userId: "",
      subscriptionId: "",
      amount: 100,
      currency: "",
    },
  });

  const submit = () => {
    setLoading(true);

    const data = {
      userId: userData._id,
      subscriptionId: payload?._id,
      amount: payload?.amount,
      currency: currencyValue,
    };
    initiateTransaction(data)
      .then((res: any) => {
        console.log(res.data.data);
        setClientSecret(res.data.data.clientSecret);
        setTransactionID(res.data.data.transactionId);
        open();
      })
      .catch((err) => {
        console.log(err);
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
    <Fragment>
      <LoadingOverlay visible={loading} />
      <CardModal opened={opened} close={close} clientSecret={clientSecret} />

      <div className="max-w-[500px]">
        <form onSubmit={form.onSubmit(submit)}>
          <Select
            size="md"
            required
            placeholder="Select subscription Type"
            label="Subscription Type"
            data={subscriptions.map((subscription) => ({
              label: subscription.type,
              value: subscription._id,
            }))}
            onChange={setValue}
          />
          <Select
            mt={16}
            size="md"
            required
            placeholder="Select currency"
            label="Currency"
            data={[
              { label: "USD", value: "USD" },
              { label: "NGN", value: "NGN" },
            ]}
            onChange={setCurrencyValue}
          />

          <div className="mt-5 flex justify-end">
            <Button size="md" className="bg-primary" type="submit">
              Add Payment
            </Button>
          </div>
        </form>

        {/* <CardElement /> */}
      </div>
    </Fragment>
  );
};

export default SubscriptionCard;
