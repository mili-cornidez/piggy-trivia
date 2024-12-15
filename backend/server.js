require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const loginRoutes = require("./routes/login");
const levelsRoutes = require("./routes/levels");
const userRoutes = require("./routes/user");
const tokensRoutes = require("./routes/tokens");
const paymasterRoutes = require("./routes/paymaster");
//const transactionRoutes = require("./routes/transaction");

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.use("/login", loginRoutes);
app.use("/levels", levelsRoutes);
app.use("/user", userRoutes);
app.use("/tokens", tokensRoutes);
app.use("/paymaster", paymasterRoutes);
//app.use("/transaction", transactionRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});