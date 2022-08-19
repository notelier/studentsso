# StudentSSO

StudentSSO's offical node.js package

## Install
```bash
npm i studentsso
# or
yarn add studentsso
```

## Docs

### `login: function (instance, provider, data)`

Logs into a service provider using a user's credentals

 * **Returns:** `object` — An object containing a name, email, and school

 * **Example:** 
 ```js
 sso.login("studentsso.blobby.me", "demo", {
     user: "John Doe",
     pass: "doejohn",
     district: "School",
});
```
 * **Exceptions:** — error if all values are not set.

### `getProvider: function (instance, provider)`

Fetches infomation about a service provider

 * **Parameters:**
   * `instance` — `string` — - An instance URL of StudentSSO (required)
   * `provider` — `string` — - Which provider you would like to you (required)

 * **Returns:** `object` — An object about a service provider.


 * **Example:** 
 ```js
sso.getProvider("studentsso.blobby.me", "demo");
```

  
 * **Exceptions:**  — error if all values are not set.

### `getDistricts: function (instance, provider, q)`

Searches instances from a service provider.

 * **Parameters:**
   * `instance` — `string` — - An instance URL of StudentSSO
   * `provider` — `string` — - Which provider you would like to you
   * `query` — `string` — - A query to search for.


 * **Returns:** `object` — An object about a service provider. Normally used for the "district" option when logging in or fetching data


 * **Example:** * 
 ```js
 sso.getDistricts("studentsso.blobby.me", "demo", "School District");
 ```
 * **Exceptions:**  — error if all values are not set.