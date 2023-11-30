import { useEffect } from "react";
import AOS from "aos";
import FeatureIcon from "../../../../assets/svgs/feature.svg";
import { featuredTutorsData } from "../../../../components/data";

type IProps = {
  item: {
    image: string;
    name: string;
    role: string;
    description: string;
  };
};

const Card = ({ item }: IProps) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div data-aos="fade-up">
      <div className="h-[350px]">
        <img src={item.image} alt="" className="object-cover" />
      </div>
      <div className="mt-5 text-center">
        <h2 className="font-bold text-lg">{item.name}</h2>
        <div>Teaches {item.role}</div>
      </div>
      <div className="mt-5 text-center">
        <h2 className="text-lg">{item.description}</h2>
      </div>
    </div>
  );
};
const FeaturedTutors = () => {
  return (
    <div
      className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-32"
      data-aos="fade-up"
    >
      <div className="flex gap-5 justify-center items-center">
        <img src={FeatureIcon} alt="" />
        <h2 className="font-bold text-primary text-2xl md:text-4xl">
          Featured Tutors
        </h2>
      </div>
      <div className="text-center">
        Have a look at our best teaches and see how they are growing and
        creating an impact.
      </div>
      <div className="mt-10 place-items-center grid sm:grid-cols-3 gap-10">
        {featuredTutorsData.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTutors;
