const statusCode = require("../util/response").httpStatus_keyValue;

const { Timestamp, FieldPath } = require("@google-cloud/firestore");
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
        const user = (await db.collection("users").doc(req.userId).get()).data();
        if (!user || user.role !== "user") {
            const err = new Error("User Not Authorized");
            err.statusCode = statusCode["401_unauthorized"];
            throw err;
        }

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

        res.status(statusCode["200_ok"]).json({
            message: "Retrieve all data article",
            totalData: result.length,
            result,
        });
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = statusCode["500_internal_server_error"];
        }
        next(e);
    }
};

exports.getArticlesById = async (req, res, next) => {
    try {
        const user = (await db.collection("users").doc(req.userId).get()).data();
        if (!user || user.role !== "user") {
            const err = new Error("User Not Authorized");
            err.statusCode = statusCode["401_unauthorized"];
            throw err;
        }

        const { card = false } = req.query;
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

            let randomItem = undefined;
            if (card === "true") {
                const articles = await db.collection("artikels").get();
                let randomIndex = Math.floor(Math.random() * articles.size);

                // avoiding random card same with details item
                while (true) {
                    randomIndex = Math.floor(Math.random() * articles.size);
                    if (parseInt(id) !== randomIndex && randomIndex !== 0) break;
                }

                const item = articles.docs[randomIndex].data();
                randomItem = Object.assign(item, {
                    ...item,
                    createdAt: formatDate(item.createdAt),
                });
            }

            res.status(statusCode["200_ok"]).json({
                message: "Get data article random",
                data: result, 
                randomItem,
            });
        } else {
            const err = new Error("ID Not Found");
            err.statusCode = statusCode["404_not_found"];
            throw err;
        }
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = statusCode["500_internal_server_error"];
        }
        next(e);
    }
};
