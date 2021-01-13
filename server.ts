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

const calculateSavings = (
  initialSavings: any,
  monthlyDeposits: any,
  interestRate: any
) => {
  let i = 0;
  let b = 0;
  let lastValue = 0;
  let yearlyAmounts = [];
  let result;
  while (i <= 600) {
    lastValue != 0
      ? (result = (lastValue + monthlyDeposits) * (1 + interestRate / 12 / 100))
      : (result =
          (initialSavings + monthlyDeposits) * (1 + interestRate / 12 / 100));
    if (b == 12) {
      yearlyAmounts.push(result);
      b = 0;
    }
    lastValue = result;
    i++;
    b++;
  }
  return yearlyAmounts;
};

app.get("/", (req, res) => {
  // Extract amounts from request
  const { initialSavings, monthlyDeposits, interestRate } = req.query;
  // Parse them into numbers
  const parsedInitialSavings =
    typeof initialSavings === "string" && Number(initialSavings);
  const parseMonthlyDeposits =
    typeof monthlyDeposits === "string" && Number(monthlyDeposits);
  const parseInterestRate =
    typeof interestRate === "string" && Number(interestRate);

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
