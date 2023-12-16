const { MONGO_DB_USER, MONGO_DB_PASS } = process.env;
export const connectionStr = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@testdata.6xzzt.mongodb.net/newsApp?retryWrites=true&w=majority`;
