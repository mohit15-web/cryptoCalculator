import { createSlice } from "@reduxjs/toolkit";

export let cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    capitalGain: 0,
    DiscountForLongTerm: 0,
    netCapitalGain: 10,
    tax: 812.5,
    taxRate: "",
    longTerm: false,
    shortTerm: false,
  },
  reducers: {
    setCapitalGain(state, action) {
      state.capitalGain =
        Number(action.payload.salePrice) -
        Number(action.payload.purchasePrice) -
        Number(action.payload.expense);
    },
    setDiscountForLongTerm(state) {
      if (state.longTerm == true && state.capitalGain > 0) {
        state.DiscountForLongTerm = state.capitalGain / 2;
      }
    },
    setNetCapitalGain(state, action) {
      state.netCapitalGain =
        action.payload.capitalGain - action.payload.DiscountForLongTerm;
    },
    setTaxRate(state, action) {
      console.log("_",action.payload);
      if (action.payload === "$0-$18,000") {
        state.taxRate = "0%";
      } else if (action.payload == "$18,000-$45,000") {
        console.log("Prateek");
        state.taxRate = "Nil + 19% of excess over $18,200";
        console.log(state.taxRate , "tax rate");
      } else if (action.payload === "$45,000-$120,000") {
        state.taxRate = "$5,092 + 32.5% of excess over $45,000";
        console.log(state.taxRate);
      } else if (action.payload === "$120,000-$180,000") {
        state.taxRate = "$29,400 + 37% of excess over $120,000";
        console.log(state.taxRate);
      } else if(action.payload === "$180,000+") {
        state.taxRate = "$51,665 + 45% of excess over $180,000";
      }else{
        state.taxRate = ""
      }
    },
    setLongTerm(state) {
      state.shortTerm = false;
      state.longTerm = !state.longTerm;
      if (state.longTerm == true && state.capitalGain > 0) {
        state.DiscountForLongTerm = state.capitalGain / 2;
      }
    },
    setShortTerm(state) {
      state.longTerm = false;
      state.shortTerm = !state.shortTerm;
    },
    setTax(state) { 
      let percentage = extractPercentage(state.taxRate);
      console.log(percentage);
      state.tax = state.netCapitalGain * (percentage / 100);
    }
  },
});

const extractPercentage = (str) => {
  const percentageMatch = str.match(/(\d+(\.\d+)?)%/);
    if(percentageMatch) {
      const percentage = parseFloat(percentageMatch[1]);
      return percentage
    }
};

export default cryptoSlice.reducer;
export const {
  setCapitalGain,
  setDiscountForLongTerm,
  setNetCapitalGain,
  setTax,
  setTaxRate,
  setLongTerm,
  setShortTerm,
} = cryptoSlice.actions;
