module.exports = (roles) => {
  console.log("hello role middleware");

  return (req, res, next) => {
    console.log(req.body.role);
    const userRole = req.body.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).send("YOU CANT DO IT");
    }
  };
};
