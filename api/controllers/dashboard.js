import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q =
    "SELECT `id`, `img`,`username`, `email`, `firstname`, `lastname`, `isadmin`FROM users ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPostsAll = (req, res) => {
  const q =
    "SELECT p.id, `title`, p.img, `date`, `uid`, `cat`, `firstname`, `lastname` FROM posts p JOIN users u ON p.uid=u.id";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// export const deleteUser = (req, res) => {
//   const q = "DELETE FROM users WHERE `id=?`";

//   db.query(q, [req.params.id], (err, data) => {
//     if (err) res.status(403).json("You didn't delete thi spost.");
//     return res.json("User has been deleted.");
//   });
// };
