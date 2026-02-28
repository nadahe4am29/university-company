import company1 from "../assets/company1.png";
import company2 from "../assets/company2.png";
import company3 from "../assets/company3.png";
import company4 from "../assets/company4.png";
import company5 from "../assets/company5.png";

const HelpedCompanies = () => {
  return (
    <div id="companies" className="bg-white">
      <div className="max-w-6xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Companies We've Helped</h2>

        <p className="text-gray-600 mb-8">
          Some of the companies we've helped recruit excellent applicants over
          the years.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
          <img
            src={company1}
            alt="Company 1"
            className="object-contain mx-auto h-20"
          />
          <img
            src={company2}
            alt="Company 2"
            className="object-contain mx-auto h-20"
          />
          <img
            src={company3}
            alt="Company 3"
            className="object-contain mx-auto h-20"
          />
          <img
            src={company4}
            alt="Company 4"
            className="object-contain mx-auto h-20"
          />
          <img
            src={company5}
            alt="Company 5"
            className="object-contain mx-auto h-20"
          />
        </div>
      </div>
    </div>
  );
};

export default HelpedCompanies;
