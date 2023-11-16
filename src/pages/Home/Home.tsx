import Banner from "./component/Banner";
import Learn from "./component/Learn";
import Navbar from "./component/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Banner />
      <Learn />
    </div>
  );
};

export default Home;
