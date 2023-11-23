import { Accordion } from "@mantine/core";
import { learningData, paymentData } from "../../../components/data";

const Faqs = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">FAQs</div>

      <div className="mt-10 max-w-[1000px] mx-auto px-6 lg:px-8">
        <h2 className=" font-medium text-2xl text-primary">Leaning</h2>
        <Accordion defaultValue="Apples" className="mt-5">
          {learningData.map((data, index) => (
            <Accordion.Item
              key={index}
              value={index.toString()}
              className="border mb-2 rounded-lg"
            >
              <Accordion.Control>{data.title}</Accordion.Control>
              <Accordion.Panel>{data.text}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div className="mt-20 max-w-[1000px] mx-auto px-6 lg:px-8">
        <h2 className=" font-medium text-2xl text-primary">Payments</h2>
        <Accordion defaultValue="Apples" className="mt-5">
          {paymentData.map((data, index) => (
            <Accordion.Item
              key={index}
              value={index.toString()}
              className="border mb-2 rounded-lg"
            >
              <Accordion.Control>{data.title}</Accordion.Control>
              <Accordion.Panel>{data.text}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
