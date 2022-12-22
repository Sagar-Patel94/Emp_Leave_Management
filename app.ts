import express, * as expressObj from "express";
import sequelize from "./src/dbConnection/dbConn";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import roleRoute from "./src/routes/roleRoute";
import fileUploadRoute from "./src/routes/fileUploadRoute";
import employeeRoute from "./src/routes/employeeRoute";
import attendenceRoute from "./src/routes/attendenceRoute";
import leaveRoute from "./src/routes/leaveRoute";
import bondRoute from "./src/routes/bondRoute";
import bankRoute from "./src/routes/bankRoute";
import salaryRoute from "./src/routes/salaryRoute";
import quarterRoute from "./src/routes/quarterRoute";
import passwordRoute from "./src/routes/passwordRoute";
import cors from "cors";

dotenv.config({ path: __dirname + "./.env" });
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/role", roleRoute);
app.use("/employee", employeeRoute);
app.use("/files", fileUploadRoute);
app.use("/attendence", attendenceRoute);
app.use("/leave", leaveRoute);
app.use("/bond", bondRoute);
app.use("/bank", bankRoute);
app.use("/salary", salaryRoute);
app.use("/quarter", quarterRoute);
app.use("/password", passwordRoute);

const PORT = process.env.PORT;

app.get("/test", (req: expressObj.Request, res: expressObj.Response): void => {
    res.json({ data: "test page" });
});;

app.listen(PORT, (): void => {
    console.log(`Server is running on port at ${PORT}`);
    sequelize
    .authenticate()
    .then(async () => {
      console.log("Database connected");
      try {
        await sequelize.sync({ force: false });
      } catch (error) {
        console.log(error, "error+++");
      }
    })
    .catch((err: Error) => {
      console.log("Error :- " + err);
    });
});
