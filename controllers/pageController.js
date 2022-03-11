exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.getPricingPage = (req, res) => {
  res.status(200).render("pricing", {
    page_name: "pricing",
  });
};
exports.getTeachersPage = (req, res) => {
  res.status(200).render("teachers", {
    page_name: "teachers",
  });
};
