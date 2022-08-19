module.exports = {
  meta: {
    name: "Demo",
    description: "",
    form: [
      {
        name: "Username",
        type: "string",
        placeholder: "Username",
        format: "any",
        qs: "user",
      },
      {
        name: "Password",
        type: "string",
        placeholder: "Password",
        format: "password",
        qs: "pass",
      },
      {
        name: "District",
        type: "string",
        placeholder: "Password",
        format: "any",
        qs: "district",
      },
    ],
  },
  login: function login(req, res) {
    if (!req.query.user || !req.query.pass || !req.query.district)
      return res.json({
        success: false,
        error: "Please provide all required objects",
      });
    res.json({
      success: true,
      name: req.query.user,
      email: `${req.query.user}@example.com`,
      district: req.query.district,
    });
  },
  lookup: function () {
    return [
      { school: "School District #1", id: "1" },
      { school: "School District #2", id: "2" },
      { school: "School District #3", id: "3" },
    ];
  },
};
