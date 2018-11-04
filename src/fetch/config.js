export default {
  prefix: "/api/",
  credentials: "same-origin",
  headers: {
    "content-type": "application/json",
  },
  logError: () => {
    console.log("Houve um erro.")
  }
}