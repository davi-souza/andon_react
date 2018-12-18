export default {
  prefix: "/api/",
  credentials: "same-origin",
  headers: {
    "content-type": "application/json",
  },
  logError: (err) => {
    console.log("Houve um erro.");
    console.log(err);
  }
}