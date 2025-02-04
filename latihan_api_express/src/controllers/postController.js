const prisma = require("../helpers/prisma");
const { postSchema } = require("../helpers/schema");

const getPost = async (req, res) => {
  try {
    // Ngambil data
    const posts = await prisma.post.findMany();

    // Tampilkan jika berhasil
    return res.json({
      succes: true,
      message: "Get data posts success",
      data: posts,
    });
  } catch (error) {
    // Erro terjadi
    return res.status(500).json({
      succes: false,
      message: "Get data posts failed!",
    });
  }
};

const createPost = async (req, res) => {
  try {
    // Validasi dari user input
    const parse = postSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(500).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    // nge body-parser
    const post = await prisma.post.create({
      data: {
        author_name: parse.data.author_name,
        content: parse.data.content,
        title: parse.data.title,
        publish: parse.data.publish,
      },
    });

    // Berhasil
    return res.json({
      succes: true,
      message: "Create data post success",
      data: post,
    });
  } catch (error) {
    // Erro terjadi
    return res.status(500).json({
      succes: false,
      message: "Create data posts failed!",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi menggunakan Zod
    const parse = postSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const post = await prisma.post.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        author_name: parse.data.author_name,
        content: parse.data.content,
        title: parse.data.title,
        publish: parse.data.publish,
      },
    });

    return res.json({
      succes: true,
      message: "Update data post success",
      data: post,
    });
  } catch (error) {
    // Erro terjadi
    return res.status(500).json({
      succes: false,
      message: "Update data post succes",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id: Number.parseInt(id)
      }
    })

    await prisma.post.delete({
      where: {
        id: Number.parseInt(id)
      }
    })

    return res.json({
      success: true,
      message: "Delete data posts success",
      data: post

    })
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Delete data post succes",
      error: error.message,
    });
  }
}

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost
};
