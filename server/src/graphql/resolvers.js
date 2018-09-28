module.exports = {
  Query: {
    // Category
    async allCategory(root, args, { DB }) {
      const categories = await DB.Category.find();

      return categories;
    },

    // Record
    async allRecord(root, args, { DB }) {
      const records = await DB.Record.find();
      console.log(records, "records");

      return records;
    }
  },
  Mutation: {
    createCategory(root, args, { DB }) {
      const newCategory = new DB.Category(args);

      return newCategory.save();
    },
    createRecord(root, args, { DB }) {
      const newRecord = new DB.Record(args);

      return newRecord.save();
    }
  }
};
