const { LinkedList } = require("../../linkedList");

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getNextWord(db, language_id) {
    return db
        .from("word")
        .select(
            "id",
            "original",
            "translation",
            "correct_count",
            "incorrect_count"
        )
        .where({ language_id });
},

checkGuess(db, language_id) {
  return db
      .from("word")
      .join("language", "word.id", "=", "language.head")
      .select("*")
      .where({ language_id });
},

getLanguageHead(db, language_id) {
  return db
      .from("language")
      .join("word", "word.language_id", "=", "language.id")
      .select("head")
      .groupBy("head")
      .where({ language_id });
},

createLinkedList(words, head) {
  const headObj = words.find((word) => word.id === head);
  const headIndex = words.indexOf(headObj);
  const headNode = words.splice(headIndex, 1);

  const list = new LinkedList();
  list.insertLast(headNode[0]);

  let nextId = headNode[0].next;
  let currentWord = words.find((word) => word.id === nextId);
  list.insertLast(currentWord);
  nextId = currentWord.next;
  currentWord = words.find((word) => word.id === nextId);

  while (currentWord !== null) {
      list.insertLast(currentWord);
      nextId = currentWord.next;
      if (nextId === null) {
          currentWord = null;
      } else {
          currentWord = words.find((word) => word.id === nextId);
      }
  }
  return list;
},

updateWordsTable(db, words, language_id, total_score) {
  return db.transaction(async (trx) => {
      return Promise.all([
          trx("language")
              .where({ id: language_id })
              .update({ total_score, head: words[0].id }),
          ...words.map((word, y) => {
              if (y + 1 >= words.length) {
                  word.next = null;
              } else {
                  word.next = words[y + 1].id;
              }
              return trx("word")
                  .where({ id: word.id })
                  .update({ ...word });
          }),
      ]);
  });
},
};


module.exports = LanguageService
