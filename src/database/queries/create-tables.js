var connection = require('../connection');

function createPageTable() {
   'use strict';

   connection.query('CREATE TABLE IF NOT EXISTS Pages (' +
     'PageID MEDIUMINT NOT NULL,' +
     'PageTitle VARCHAR(100) NOT NULL,' +
     'PRIMARY KEY (PageID)' +
     ');');
}

function createQuestionTable() {
   'use strict';

   connection.query('CREATE TABLE IF NOT EXISTS Questions (' +
     'QuestionID MEDIUMINT NOT NULL AUTO_INCREMENT,' +
     'PageID MEDIUMINT NOT NULL,' +
     'QuestionType VARCHAR(20) NOT NULL,' +
     'QuestionName VARCHAR(100) NOT NULL,' +
     'QuestionStatement TEXT NOT NULL,' +
     'QuestionCode TEXT,' +
     'Hint1 TEXT NOT NULL,' +
     'Hint2 TEXT NOT NULL,' +
     'Hint3 TEXT NOT NULL,' +
     'EmbedURL VARCHAR(200),' +
     'PRIMARY KEY (QuestionID),' +
     'FOREIGN KEY (PageID)' +
     'REFERENCES Pages(PageID)' +
     'ON DELETE CASCADE' +
     ');');
}

function createCodingAnswerTable() {
   'use strict';

   connection.query('CREATE TABLE IF NOT EXISTS CodingAnswers (' +
     'AnswerID MEDIUMINT NOT NULL AUTO_INCREMENT,' +
     'QuestionID MEDIUMINT NOT NULL,' +
     'Input TEXT NOT NULL,' +
     'Output TEXT NOT NULL,' +
     'PRIMARY KEY (AnswerID),' +
     'FOREIGN KEY (QuestionID)' +
     'REFERENCES Questions(QuestionID)' +
     'ON DELETE CASCADE' +
     ');');
}

function createMultipleChoiceAnswerTable() {
   'use strict';

   connection.query('CREATE TABLE IF NOT EXISTS MultipleChoiceAnswers (' +
     'AnswerID MEDIUMINT NOT NULL AUTO_INCREMENT,' +
     'QuestionID MEDIUMINT NOT NULL,' +
     'OptionText VARCHAR(100) NOT NULL,' +
     'Correct BOOL NOT NULL,' +
     'PRIMARY KEY (AnswerID),' +
     'FOREIGN KEY (QuestionID)' +
     'REFERENCES Questions(QuestionID)' +
     'ON DELETE CASCADE' +
     ');');
}

function createAccessTokenTable() {
   'use strict';

   connection.query('CREATE TABLE IF NOT EXISTS AccessTokens (' +
     'TokenID MEDIUMINT NOT NULL AUTO_INCREMENT,' +
     'AccessToken VARCHAR(100) NOT NULL,' +
     'PRIMARY KEY (TokenID)' +
     ');');
}

function createTables() {
   'use strict';

   createPageTable();
   createQuestionTable();
   createCodingAnswerTable();
   createMultipleChoiceAnswerTable();
   createAccessTokenTable();
}

module.exports = createTables;
