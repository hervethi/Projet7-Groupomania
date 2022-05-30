const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const checkLike = require("../middlewares/checkLike");
const checkPost = require("../middlewares/checkPost");
const multer = require("../middlewares/multer-config");
const fileCtrl = require("../middlewares/fileCtrl");
const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/", auth, multer, postCtrl.post);

// Route pour récupérer tous les messages
router.get("/", auth, postCtrl.getAllPosts);

// Route pour récupérer un message
router.get("/:id", auth, checkPost.checkPost, postCtrl.getPostFromAPI);

// Route pour modifier un message
router.put("/:id", auth, postCtrl.updatePost);

// Route pour supprimer un message
router.delete(
  "/:id",
  auth,
  checkPost.checkPost,
  fileCtrl.deleteFile,
  postCtrl.deletePost
);

// Route pour récupérer un like
router.get(
  "/:id_post/likes/:id_user",
  auth,
  checkLike.countPostLike,
  checkLike.checkUserLike,
  postCtrl.getLike
);

// Route pour modifier un like
router.put(
  "/:id_post/likes/:id_user",
  auth,
  checkLike.checkUserLike,
  postCtrl.updateLike
);

// Route pour récupérer tous les commentaires d'un post
router.get("/:id_post/comments", auth, postCtrl.getAllCommentsOfPost);

// Route pour compter tous les commentaires d'un post
router.get("/:id_post/comments/count", auth, postCtrl.getCountPostComments);

// Route pour poster un commentaire
router.post("/:id_post/comments", auth, postCtrl.saveComment);

// Route pour modifier un commentaire
router.put("/:id_post/comments/:id_comment", auth, postCtrl.updateComment);

// Route pour supprimer un commentaire
router.delete("/:id_post/comments/:id_comment", auth, postCtrl.deleteComment);

module.exports = router;
