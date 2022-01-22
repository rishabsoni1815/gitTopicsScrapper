const request = require("request");
const cheerio = require("cheerio");
const pdfKit = require("pdfkit");
const getIssuesHtml = require("./reposIssues");
function getReposPageHtml(url, topicName) {
  request(url, callback);
  function callback(err, response, html) {
    if (err) {
      console.log(err);
    } else if (response.statusCode == 404) {
      console.log("page not found");
    } else {
      getReposLinks(html);
    }
  }
  function getReposLinks(html) {
    let $ = cheerio.load(html);
    let linksElementArray = $(
      ".f3.color-fg-muted.text-normal.lh-condensed"
    );
    for (
      let iterator = 0;
      iterator < Math.min(10, linksElementArray.length);
      iterator++
    ) {
      let anchorsPresent = $(linksElementArray[iterator]).find("a");
      let linkToRepos = $(anchorsPresent[1]).attr("href");
      let fullLinkToRepos = `https://github.com${linkToRepos}/issues?q=is%3Aopen+is%3Aissue`;
      let repoName = linkToRepos.split("/").pop();
      getIssuesHtml(fullLinkToRepos, topicName, repoName);
    }
  }
}
module.exports = getReposPageHtml;
