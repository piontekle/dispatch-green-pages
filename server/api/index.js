const router = require('express').Router();

const companies = require("./companies/routes");

router.use("/companies", companies);

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Connected!" })
})

module.exports = router;
