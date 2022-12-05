import { db } from "../db.js";

export const getUser = (req, res) => {
  const q =
    "SELECT p.id, p.img AS postImg, `title`, `desc`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE u.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE `id=?`";

  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(403).json("You didn't delete this user.");
    return res.json("User has been deleted.");
  });
};
