const express = require("express");
const { google } = require("googleapis");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { user, currentSample, valence_score, arousal_score, raw_emotion, agency, probability, power, situational_state, motivational_state } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1ZJbClpRpCcBavnot1-RYJ40MkRdXAjV9SMLasrEZn0Y";

  // Get the first row from "Sheet1"
  const header = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A1:I1",
  });

  //store first row
  const firstRow = header.data.values;

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const sheets = metaData.data.sheets.map(sheet => sheet.properties.title);
  let sheetExists = sheets.includes(user);

  // Create a new sheet and copy the first row if it doesn't exist
  if (!sheetExists) {
    await googleSheets.spreadsheets.batchUpdate({
      auth,
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: user,
              },
            },
          },
        ],
      },
    });

    // Copy the first row to the new sheet
    if (firstRow && firstRow.length > 0) {
      await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `${user}!A1:I1`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: firstRow,
        },
      });
    }
    
  

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `${user}!A:I`, // Adjust this range according to your needs
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [currentSample, valence_score, arousal_score, raw_emotion, agency, probability, power, situational_state, motivational_state],
        ],
      },
    });

    res.send("Successfully submitted! Thank you!");
  };
});

app.listen(1337, (req, res) => console.log("running on 1337"));
