import express from "express";

const app = express();

// CORS
app.use(function (req, res, next) {
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    if (req.method === "OPTIONS") return res.send(200);
  }
  next();
});

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Calculates current month saving applying corresponding interest
const applyInterestRate = (
  principal: number,
  monthlyDeposit: number,
  interestRate: number
) => (principal + monthlyDeposit) * (1 + interestRate / 12 / 100);

// Calculates all savings monthly and returns annual ones
const calculateSavings = (
  initialSavings: number,
  monthlyDeposits: number,
  interestRate: number
) => {
  let i = 1;
  let lastValue = initialSavings;
  let annualAmounts = [];
  let result;
  while (i <= 600) {
    result = applyInterestRate(lastValue, monthlyDeposits, interestRate);
    lastValue = result;
    i % 12 == 0 && annualAmounts.push(result);
    i++;
  }

  return annualAmounts;
};

app.get("/", (req, res) => {
  // Extract amounts from request
  const { initialSavings, monthlyDeposits, interestRate } = req.query;

  // Format strings into numbers
  const parsedInitialSavings = initialSavings && Number(initialSavings);
  const parseMonthlyDeposits = monthlyDeposits && Number(monthlyDeposits);
  const parseInterestRate = interestRate && Number(interestRate);

  // Check that  we have all the data we need to calculate
  const receivedNecessaryData =
    initialSavings && monthlyDeposits && interestRate;

  // Calculate savings over time
  const savingsOverTime = receivedNecessaryData
    ? calculateSavings(
        parsedInitialSavings as number,
        parseMonthlyDeposits as number,
        parseInterestRate as number
      )
    : Array.from({ length: 50 }, () => null);

  // Send savings over time
  res.send(JSON.stringify(savingsOverTime));
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
