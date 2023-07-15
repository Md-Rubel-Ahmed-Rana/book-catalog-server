import app from "./app";
import databaseConnection from "./config";
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Book catalog server is runing on port ${port}`);
  databaseConnection();
});
