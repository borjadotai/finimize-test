import express from "express";

const app = express();

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

// type RequestType = {
//   initialSavings: number | null
//   monthlyDeposits: number | null
//   interestRate: number | null
// }

const calculateSavings = (
  initialSavings: any,
  monthlyDeposits: any,
  interestRate: any
) => {
  let i = 0;
  let lastValue = 0;
  let yearlyAmounts = [];
  let result;
  while (i <= 50) {
    lastValue != 0
      ? (result = (lastValue + monthlyDeposits * 12) * (1 + interestRate / 10))
      : (result =
          (initialSavings + monthlyDeposits * 12) * (1 + interestRate / 10));
    yearlyAmounts.push(result);
    lastValue = result;
    i++;
  }
  return yearlyAmounts;
};

app.get("/", (req, res) => {
  // Extract amounts from request
  const { initialSavings, monthlyDeposits, interestRate } = req.query;
  // Parse them into numbers
  const parsedInitialSavings =
    typeof initialSavings === "string" && parseInt(initialSavings);
  const parseMonthlyDeposits =
    typeof monthlyDeposits === "string" && parseInt(monthlyDeposits);
  const parseInterestRate =
    typeof interestRate === "string" && parseInt(interestRate);

  // Calculate savings over time
  const savingsOverTime = calculateSavings(
    parsedInitialSavings,
    parseMonthlyDeposits,
    parseInterestRate
  );

  // Send savings over time
  res.send(JSON.stringify(savingsOverTime));
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
