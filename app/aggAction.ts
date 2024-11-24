"use server";

/*
        The API call didn't work because of CORS errors we didn't get resolved...
        We decided to reverse engineer the BudgetCalculator instead and build an approximation ourselves. See below
    
        const requestOptions = {
          method: "POST",
          body: {
            calculationMode: "AMORTIZATION",
            equityCash: 50500,
            additionalLoan: 0,
            //desiredTotalTime: 0,
            monthlyRate: 2000,
            federalState: "DE-BW",
            amortisation: 1.5,
            fixedPeriod: 10,
            salary: 5000,
          },
          headers: {
            "content-type": "application/json",
          },
        };
    
        //let url = "https://api.thinkimmo.com/immo?type=APARTMENTBUY&excludedFields=true&geoSearches=[%7B%22geoSearchQuery%22:%22Garching+bei+M%C3%BCnchen%22,%22geoSearchType%22:%22zipCode%22,%22zipCode%22:%2285748%22,%22region%22:%22Bayern%22%7D]&averageAggregation=buyingPrice%3BpricePerSqm%3BsquareMeter%3BconstructionYear%3BrentPrice%3BrentPricePerSqm%3BrunningTime&termsAggregation=platforms.name.keyword,60";
        let mod_url =
          "https://www.interhyp.de/customer-generation/budget/calculateMaxBuyingPower";
    
        const response = await fetch(mod_url, requestOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }
    
        // Parse the JSON response
        const data = await response.json();
        const res = data.results;
    
        // Log the fetched data to the browser's console
        console.log("Fetched data from the server:", data);
        //console.log("Fetched data from the server:", res);
        return res;
         */

export async function getAggCost(
  self_capital: number,
  income: number,
  payment_rate: number
) {
  //Our own implementation for the budget calculator
  const interest = 3.61;
  const amort = 1.5;
  //credit * (interest +  amort) = annuity = 12* monthly payment = 12* payment rate
  //=> credit budget = annuity / (interest + amort) = (payment_rate * 12) / (interest + amort)
  const credit_budget = (payment_rate * 12) / (interest + amort);

  const kaufnebenkosten = (3.5 + 2 + 3.75) / 100; // 3.5 % Grunderwerbssteuer , 2% notary's office + 3.75 % for the broker/ Makler
  //We chose constant 3.5% because we mainly work with bavaria. For proper implementation we would use the API, which handles different property tax already.
  //We prepared user input for the federal state already to give it to the API for when we make the API work.

  const budget = credit_budget + self_capital - credit_budget * kaufnebenkosten; //simple solution for now that gives a somewhat reasonable value. For future we would implement the API call

  return budget;
}
