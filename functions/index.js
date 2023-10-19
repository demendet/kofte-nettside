/* eslint-disable max-len */

const admin = require("firebase-admin");
const {onRequest} = require("firebase-functions/v2/https");

exports.sayHello = onRequest(
    {cors: ["http://localhost:3000"]},
    async (req, res) => {
      if (!req.auth || !req.auth.token.admin) {
        return res.status(403).json({error: "Only admins can search for users"});
      }

      const db = admin.firestore();
      const usersRef = db.collection("users");

      try {
        const querySnapshot = await usersRef.where("firstName", "==", req.body.firstName).get();
        if (querySnapshot.empty) {
          return res.status(404).json({error: `User with first name ${req.body.firstName} not found`});
        }

        const users = querySnapshot.docs.map((doc) => doc.data());
        return res.status(200).json(users);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
);
