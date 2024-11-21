const express = require("express")
const app = express()

const database = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
database.connect();

app.use(express.json());

const auth =  require("./routes/auth")
const task =  require("./routes/task")
app.use("/api/v1",auth)
app.use("/api/v2",task)
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});