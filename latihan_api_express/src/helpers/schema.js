const z = require("zod");

const postSchema = z.object({
  title: z.string(),
  author_name: z.string(),
  content: z.string(),
  publish: z.boolean(),
});

module.exports = { postSchema };
