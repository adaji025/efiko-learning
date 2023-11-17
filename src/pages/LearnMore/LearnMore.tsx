import Line from "../../assets/svgs/underline.svg";
import { Accordion } from "@mantine/core";

const LearnMore = () => {
  const learningData = [
    {
      title: `What is Efiko Learning? `,
      text: `We have already answered your most asked questions. Have a look at the
      FAQs below.`,
    },
    {
      title: `How to use Efiko Learning? `,
      text: `We have already answered your most asked questions. Have a look at the
      FAQs below.`,
    },
    {
      title: `How Efiko Learning can benfit me? `,
      text: `We have already answered your most asked questions. Have a look at the
      FAQs below.`,
    },
  ];

  const paymentData = [
    {
      title: `What payment method to use at Efiko Learning?  `,
      text: `We have already answered your most asked questions. Have a look at the
      FAQs below.`,
    },
    {
      title: `How can I increase my earnings?`,
      text: `We have already answered your most asked questions. Have a look at the
      FAQs below.`,
    },
    {
      title: `How much I can earn on Efiko Learning in one month?`,
      text: `We have already answered your most asked questions. Have a look at the
      FAQs below.`,
    },
  ];
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
            <Accordion.Item key={index} value={index.toString()} className="border mb-2 rounded-lg">
              <Accordion.Control>{data.title}</Accordion.Control>
              <Accordion.Panel>{data.text}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div className="mt-20 max-w-[1000px] mx-auto">
        <h2 className="text-center font-bold text-2xl text-primary">Payments</h2>
        <Accordion defaultValue="Apples" className="mt-5">
          {paymentData.map((data, index) => (
            <Accordion.Item key={index} value={index.toString()} className="border mb-2 rounded-lg">
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
