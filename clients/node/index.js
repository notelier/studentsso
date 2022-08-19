function isValid(thing, type) {
  if (type == "string") return typeof thing == "string";
  if (type == "number") return typeof parseInt(thing) == "number";
  if (type == "object") return typeof thing == "object";
  if (type == "any") return true;
  if (type == "url")
    return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
      thing
    );
  if (type == "email")
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      thing
    );
} // will be used at some point, but not now...

module.exports = {
  meta: {
    package: "studentsso",
    version: require("./package.json").version,
    author: "aboutdavid",
  },
  /**
   * Logs into a service provider using a user's credentals
   *
   * @property {string} instance - An instance URL of StudentSSO (required)
   * @property {string} provider - Which provider you would like to you (required)
   * @property {object} data - An object of the login details, sent as querystrings. (required)
   *
   * @returns {object} An object containing a name, email, and school
   *
   * @example
   * sso.login("studentsso.blobby.me", "demo", {
   * user: "John Doe",
   * pass: "doejohn",
   * district: "demo",
   *});
   * @prop {object} user
   * @prop {string} user.name  - Name of the user
   * @prop {string} user.email  - Email of the user
   * @prop {string} user.school - School or district of the user.
   *
   * @throws An error if all values are not set.
   */
  login: function (instance, provider, data) {
    var request = require("sync-request");
    var res = request("POST", `${instance}/api/signin/${provider}`, {
      headers: {
        "user-agent": `StudentSSO Node.js Library/${
          require("./package.json").version
        }`,
      },
      qs: data,
    });
    if (res.statusCode >= 500) {
      return {
        success: false,
        error: "An internal error occured.",
        clientside: true,
      };
    }
    return JSON.parse(res.getBody("utf8"));
  },
  /**
   * Fetches infomation about a service provider
   *
   * @param {string} instance - An instance URL of StudentSSO (required)
   * @param {string} provider - Which provider you would like to you (required)
   *
   * @returns {object} An object about a service provider.
   *
   * @example
   * // Returns an object
   * sso.getProvider("studentsso.blobby.me", "demo");
   *
   * @prop {object} provider
   * @prop {string} provider.name    - Name of the service
   * @prop {string} provider.website - Website of the service
   * @prop {array}  provider.form    - Required values for the service.
   *
   * @throws An error if all values are not set.
   */
  getProvider: function (instance, provider) {
    var request = require("sync-request");
    var res = request("GET", `${instance}/api/signin/${provider}`, {
      headers: {
        "user-agent": `StudentSSO Node.js Library/${
          require("./package.json").version
        }`,
      },
    });
    if (res.statusCode >= 500) {
      return {
        success: false,
        error: "An internal error occured.",
        clientside: true,
      };
    }
    return JSON.parse(res.getBody("utf8"));
  },
  /**
   * Searches instances from a service provider.
   *
   * @param {string} instance - An instance URL of StudentSSO
   * @param {string} provider - Which provider you would like to you
   * @param {string} query - A query to search for.
   *
   * @returns {object} An object about a service provider. Normally used for the "district" option when logging in or fetching data
   *
   * @example
   * sso.getDistricts("studentsso.blobby.me", "demo", "School District");
   * @prop {array} districts - An array of district and IDs for this districts. Use this for the "district" object when logging in.
   * @throws An error if all values are not set.
   */
  getDistricts: function (instance, provider, q) {
    var request = require("sync-request");
    var res = request("GET", `${instance}/api/lookup/${provider}?q=${q}`, {
      headers: {
        "user-agent": `StudentSSO Node.js Library/${
          require("./package.json").version
        }`,
      },
    });
    if (res.statusCode >= 500) {
      return {
        success: false,
        error: "An internal error occured.",
        clientside: true,
      };
    }
    return JSON.parse(res.getBody("utf8"));
  },
};
