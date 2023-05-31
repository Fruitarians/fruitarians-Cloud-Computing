const statusCode = require("../util/response").httpStatus_keyValue;

const { Timestamp } = require("@google-cloud/firestore");
const db = require("../database/db");

const formatDate = (dateInput) => {
  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (dateInput) {
    const date = new Date(dateInput._seconds * 1000); // Konversi detik ke milidetik
    return dateFormatter.format(date);
  }
  return dateFormatter.format(new Date());
};

exports.getArticles = async (req, res, next) => {
    try {
        const articles = await db.collection("artikels").get();

        const result = [];

        if (articles.size > 0) {
            const { docs } = articles;
            docs.map((_doc) => {
            const data = _doc.data();
            result.push({
                id: data.id,
                title: data.title,
                konten: data.konten,
                author: data.author,
                photo: data.photo,
                createdAt: formatDate(data.createdAt),
            });
            });
        }

        res
            .status(statusCode["200_ok"])
            .json({ data: result, totalData: articles.size });
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = statusCode["500_internal_server_error"];
        }
        next(e);
    }
};

exports.getArticlesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const articles = await db
            .collection("artikels")
            .where("id", "==", parseInt(id))
            .get();
        const result = {};

        if (articles.size > 0) {
            const { docs } = articles;
            docs.map((_doc) => {
            const data = _doc.data();
            Object.assign(result, {
                id: data.id,
                title: data.title,
                konten: data.konten,
                author: data.author,
                photo: data.photo,
                createdAt: formatDate(data.createdAt),
            });
            });

            res.status(statusCode["200_ok"]).json({ data: result });
        } else {
            throw new TypeError("id not found");
        }
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = statusCode["500_internal_server_error"];
        }
        next(e);
    }
};
