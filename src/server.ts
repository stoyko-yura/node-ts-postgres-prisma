import app from "./app";
import { prismaDisconnect } from "./db";

const runServer = async () => {
  const PORT = 3000;

  try {
    app.listen(PORT, () => {
      console.log(`Server running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

runServer()
  .then(() => {
    prismaDisconnect();
  })
  .catch((error) => {
    console.log(error);

    prismaDisconnect();

    process.exit(1);
  });
