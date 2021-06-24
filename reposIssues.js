const request = require("request");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const pdfKit = require("pdfkit");
function getIssuesHtml(url, topicName, repoName) {
  request(url, callback);
  function callback(err, response, html) {
    if (err) {
      console.log(err);
    } else if (response.statusCode == 404) {
      console.log("page not found");
    } else {
      getIssues(html);
    }
  }
  function getIssues(html) {
    let $ = cheerio.load(html);
    let isseuesArray = $(
      ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
    );
    let iArr = [];
    for (let iterator = 0; iterator < isseuesArray.length; iterator++) {
      let linkToIssues = $(isseuesArray[iterator]).attr("href");
      iArr.push(`https://github.com${linkToIssues}`);
    }
    let folderPath = path.join(__dirname, topicName);
    // let folderPath = path.join("C:/Users/HP/Desktop/GitHubIssues", topicName);
    dirCreater(folderPath);
    let filePath = path.join(folderPath, repoName + ".pdf");
    let text = JSON.stringify(iArr);
    let pdfDoc = new pdfKit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.fillColor("blue");
    pdfDoc.list(iArr);
    pdfDoc.moveDown(0.5);
    pdfDoc.end();
  }
}
function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) == false) {
    fs.mkdirSync(folderPath);
  }
}
module.exports = getIssuesHtml;

//references ---->  https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit
