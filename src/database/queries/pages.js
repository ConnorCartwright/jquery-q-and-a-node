var connection = require('../connection');

function addPage(pageID, pageTitle) {
   'use strict';

   var queryString = 'INSERT IGNORE INTO Pages (PageID, PageTitle) VALUES(?, ?)';

   connection.query(queryString, [pageID, pageTitle], function(err, results) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return '';
      } else {
         return results.insertId;
      }
   });
}

function pageCount(pageID, callback) {
   'use strict';

   var queryString = 'SELECT COUNT(Pages.PageID) AS "PageCount" ' +
      'FROM Pages ' +
      'INNER JOIN Questions ' +
        'ON Pages.PageID=Questions.PageID ' +
      'WHERE Pages.PageID=?;';

   connection.query(queryString, [pageID], function(err, result) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return callback('Error');
      } else {
         return callback(result);
      }
   });
}

function getPageQuestions(pageID, callback) {
   'use strict';

   var queryString = 'SELECT Questions.QuestionID AS questionID, Questions.QuestionType AS questionType, ' +
      'Questions.QuestionName AS questionName, Questions.QuestionStatement AS questionStatement, ' +
      'Questions.QuestionCode AS questionCode, Questions.Hint1 AS hint1, Questions.Hint2 AS hint2, Questions.Hint3 AS hint3 ' +
      'FROM Pages ' +
      'INNER JOIN Questions ' +
      'ON Pages.PageID=Questions.PageID ' +
      'WHERE Pages.PageID=?;';

   connection.query(queryString, [pageID], function(err, result) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return callback('Error');
      } else {
         return callback(result);
      }
   });
}

// Update page title (if ID is the same but title differs)
// get title?
// question count

module.exports = {
   addPage: addPage,
   pageCount: pageCount,
   getPageQuestions: getPageQuestions
};

