import Line from "../../../assets/svgs/underline.svg";
import { Accordion } from "@mantine/core";
import { learningData, paymentData } from "../../../components/data";
import { useEffect } from "react";

const LearnMore = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="px-6 lg:px-8">
      <div className="flex flex-col items-center justify-end min-h-[50vh]">
        <h2 className="font-bold text-4xl">FAQs</h2>
        <img src={Line} alt="line" />
        <div className="mt-5">
          We have already answered your most asked questions. Have a look at the
          FAQs below.
        </div>
      </div>
      <div className="mt-20 max-w-[1000px] mx-auto">
        <h2 className="text-center font-bold text-2xl text-primary">Leaning</h2>
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
      <div className="mt-20 max-w-[1000px] mx-auto">
        <h2 className="text-center font-bold text-2xl text-primary">
          Payments
        </h2>
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

export default LearnMore;
