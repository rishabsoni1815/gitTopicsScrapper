let url = "https://github.com/topics";
const request = require("request");
const pdfKit = require("pdfkit");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");
request(url, callback);
function callback(err, response, html) {
  if (err) {
    console.log(err);
  } else if (response.statusCode == 404) {
    console.log("page not found");
  } else {
    getTopicLinks(html);
  }
}

function getTopicLinks(html) {
  let $ = cheerio.load(html);
  let linksElementArray = $(
    ".no-underline.d-flex.flex-column.flex-justify-center"
  );
  for (let iterator = 0; iterator < linksElementArray.length; iterator++) {
    let linkHref = $(linksElementArray[iterator]).attr("href");
    let topicName = linkHref.split("/").pop();
    console.log(topicName)
    let completelinkHref = `https://github.com${linkHref}`;
    getReposPageHtml(completelinkHref, topicName);
  }
}
