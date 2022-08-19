module.exports = {
  meta: {
    name: "ClassLink",
    website: "https://classlink.com",
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
        name: "District URL",
        type: "string",
        placeholder: "Password",
        format: "url",
        qs: "district",
      },
    ],
  },
  login: async function (req, res) {
    if (!req.query.user || !req.query.pass || !req.query.district)
      res.json({
        success: false,
        error: "Please provide all required objects",
      });
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(req.query.district);
    await page.type(`input[name="username"]`, req.query.user);
    await page.type(`input[name="password"]`, req.query.pass);

    await Promise.all([page.click('button[name="signin"]')]);
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    setTimeout(async function () {
      // Required for classlink to fully load 🙄
      page.click('div[aria-label="Show Profile Info"]');
      const name = await page.$$eval('p[class="profile-name"]', (el) => {
        return el[0].innerHTML;
      });
      const details = await page.$$eval('p[class="profile-detail"]', (el) => {
        return { email: el[0].innerHTML, school: el[1].innerHTML };
      });
      res.json({ success: true, name, ...details });
      await browser.close();
    }, 3000);
  },
  lookup: function (q) {
    const request = require("sync-request");
    var i = 0;
    var districts = [];
    var res = request(
      "GET",
      "https://myapps.classlink.io/schoolFinder/v1p0/search?term=" + q,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
      }
    );
    var data = JSON.parse(res.getBody("utf8")).results;

    while (i < data.length) {
      districts.push({
        school: data[i].label,
        id: `https://launchpad.classlink.com/${data[i].customUrl}`,
      });
      i++;
    }
    return districts;
  },
};
