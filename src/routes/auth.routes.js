import express from "express";
const router = express.Router();

router.get("/pin", (req, res) => {
  res.render("pin", { error: null });
});

router.post("/pin", (req, res) => {
  const pin = req.body.pin;

  if (pin === process.env.BROWSE_PIN) {
    req.session.authorized = true;
    return res.redirect("/browse");
  }

  res.render("pin", { error: "Invalid PIN" });
});


router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});


export default router;
