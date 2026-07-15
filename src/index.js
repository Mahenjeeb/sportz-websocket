import express from "express";
const app = expres();
app.use(expres.json());
app.get("/", (_, resp) => {
  return resp.send("App is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
