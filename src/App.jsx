import { useDispatch, useSelector } from "react-redux";
import rightIMG from "./assets/image.png";
import Dropdown from "./components/Dropdown";
import { useEffect, useState } from "react";
import {
  setCapitalGain,
  setDiscountForLongTerm,
  setLongTerm,
  setNetCapitalGain,
  setShortTerm,
  setTax,
  setTaxRate,
} from "./store/slices";
import { FaCheck } from "react-icons/fa";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Faq } from "./components/FAQ";

const years = [
  {
    id: 1,
    name: "FY 2023-2024",
  },
  {
    id: 2,
    name: "FY 2022-2023",
  },
  {
    id: 3,
    name: "FY 2021-2022",
  },
];

const countries = [
  {
    id: 1,
    name: "Australia",
  },
  {
    id: 2,
    name: "USA",
  },
  {
    id: 3,
    name: "UK",
  },
];

const App = () => {
  let store = useSelector((state) => state.crypto);
  console.log(store);

  const {
    capitalGain,
    DiscountForLongTerm,
    netCapitalGain,
    tax,
    taxRate,
    longTerm,
    shortTerm,
  } = store;
  const [income, setIncome] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [expense, setExpense] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCapitalGain({ salePrice, purchasePrice, expense }));
    dispatch(setDiscountForLongTerm());
    dispatch(setNetCapitalGain({ capitalGain, DiscountForLongTerm }));
    dispatch(setTaxRate(income));
    dispatch(setTax());
  }, [
    purchasePrice,
    salePrice,
    expense,
    dispatch,
    DiscountForLongTerm,
    capitalGain,
    income,
    taxRate,
    tax
  ]);

  console.log(income, "in app.jsx");
  return (
    <>
      <Navbar />
      <div className="flex bg-[#EFF3F4] w-[100%]">
        {/* left side  */}
        <div className="bg-white 2xl:p-20 p-5 m-10 flex flex-col justify-center items-center rounded-xl w-[90%] 2xl:w-[80%]">
          <h1 className="2xl:text-3xl text-xl font-bold text-center mb-6">
            Free Crypto Tax Calculator Australia
          </h1>

          <div className="flex justify-between flex-wrap items-center py-8 w-[95%]">
            <div className="flex gap-2 justify-center 2xl:ml-0 items-center">
              <p>Financial Year</p>
              <Dropdown options={years} />
            </div>
            <div className="flex gap-2 justify-center items-center mr-12">
              <p>Country</p>
              <Dropdown options={countries} />
            </div>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-12 py-8">
            <div>
              <p>Enter purchased price of Crypto</p>
              <input
                type="text"
                placeholder="$ 30,000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            <div>
              <p>Enter sale price of Crypto</p>
              <input
                type="text"
                placeholder="$ 20,000"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
            <div>
              <p>Enter your Expenses</p>
              <input
                type="text"
                placeholder="$ 5,000"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
            </div>
            <div className="w-96">
              <p>Investment types</p>
              <div className="flex gap-4">
                <button
                  className={`p-2 border rounded-md my-2 w-32 flex justify-center items-center gap-3 ${
                    shortTerm && "border-blue-600 border-2 text-blue-700"
                  }`}
                  onClick={() => dispatch(setShortTerm({ salePrice, purchasePrice, expense }))}
                >
                  Short Term
                  {shortTerm && (
                    <FaCheck className={`${shortTerm && "text-blue-700"}`} />
                  )}
                </button>
                <button
                  className={`p-2 border rounded-md my-2 w-32 flex justify-center items-center gap-3 ${
                    longTerm && "border-blue-600 text-blue-700 border-2"
                  }`}
                  onClick={() => dispatch(setLongTerm())}
                >
                  Long Term
                  {longTerm && (
                    <FaCheck className={`${longTerm && "text-blue-700"}`} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p>Select Your Annual Income</p>
              <select
                name=""
                id=""
                className="w-[380px]"
                onChange={(e) => setIncome(e.target.value)}
              >
                <option value="$0-$18,000">$0 - $18,000 </option>
                <option value="$18,000-$45,000">$18,000 - $45,000</option>
                <option value="$45,000-$120,000">$45,000 - $120,000</option>
                <option value="$120,000-$180,000">$120,001 - $180,000</option>
                <option value="$180,000+">$180,000+</option>
              </select>
            </div>
            <div className="w-96">
              <p>Tax Rate</p>
              <h1>
                {taxRate ? taxRate : "$5,092 + 32.5% of excess over $45,000"}{" "}
              </h1>
            </div>
            {shortTerm ? null : (
              <div className="w-96">
                <p>Capital Gains Amount</p>
                <h1 className="bg-[#EFF3F4] p-2">
                  {" "}
                  <span className="font-bold p-2">
                    $ {capitalGain ? capitalGain : "5000"}
                  </span>{" "}
                </h1>
              </div>
            )}
            {shortTerm ? null : (
              <div className="w-96">
                <p>Discount for long term gains</p>
                <h1 className="bg-[#EAF2FE] p-2">
                  <span className="font-bold p-2">
                    {" "}
                    $ {DiscountForLongTerm ? DiscountForLongTerm : "2,500"}
                  </span>{" "}
                </h1>
              </div>
            )}
            <div className="w-96  bg-[#EBF8F5] flex justify-center items-center flex-col py-4 rounded-xl">
              <h2 className="font-bold py-2">Net Capital gains tax amount</h2>
              <h1 className="text-[#52CDA7] font-extrabold text-2xl">
                $ {netCapitalGain ? netCapitalGain : "2,500"}
              </h1>
            </div>
            <div className="w-96 bg-[#EAF2FE]  flex justify-center items-center flex-col py-4 rounded-xl">
              <h2 className="font-bold py-2">The tax you need to pay*</h2>
              <h1 className="text-[#0041CE] font-extrabold text-2xl ">
                $ {tax ? tax : "812.5"}{" "}
              </h1>
            </div>
          </div>
        </div>
        {/* right side  */}
        <div className="rounded-lg hidden 2xl:block py-10 w-96">
          <img src={rightIMG} alt="" className="rounded-lg" />
        </div>
      </div>

      <Faq />

      <Footer />
    </>
  );
};

export default App;
