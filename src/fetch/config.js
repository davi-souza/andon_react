export default {
  prefix: "/api/",
  credentials: "same-origin",
  headers: {
    "content-type": "application/json",
  },
  logError: (error) => {
    console.log("Houve um erro.");
    console.log(error);
  }
}
