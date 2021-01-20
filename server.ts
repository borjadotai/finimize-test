import express from "express";
import { calculateSavings } from "./savings";

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

app.get("/savings", (req, res) => {
  // Extract amounts from request
  const { initialSavings, monthlyDeposits, interestRate } = req.query;

  // Validation & error handling
  if (!initialSavings) {
    return res.status(400).send({
      message: "Initial savings is missing!",
    });
  }

  if (!monthlyDeposits) {
    return res.status(400).send({
      message: "Monthly deposits is missing!",
    });
  }

  if (!interestRate && interestRate !== "0") {
    return res.status(400).send({
      message: "Interest rate is missing!",
    });
  }

  // Format strings into numbers
  const parsedInitialSavings = Number(initialSavings);
  const parseMonthlyDeposits = Number(monthlyDeposits);
  const parseInterestRate = Number(interestRate);

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
