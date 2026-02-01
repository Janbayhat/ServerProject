const axios = require("axios");
const Favorite = require("../models/favoriteModel");

exports.page = async (req, res) => {
  const favorites = await Favorite.getByUser(req.session.user.id);
  res.render("videos", { results: null, favorites });
};

exports.search = async (req, res) => {
  const q = req.query.q;
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        q,
        maxResults: 5
      }
    }
  );
  const favorites = await Favorite.getByUser(req.session.user.id);
  res.render("videos", { results: response.data.items, favorites });
};

exports.add = async (req, res) => {
  await Favorite.add(
    req.session.user.id,
    req.body.video_id,
    req.body.title,
    req.body.thumbnail
  );
  res.redirect("/videos");
};

exports.remove = async (req, res) => {
  await Favorite.remove(req.params.id);
  res.redirect("/videos");
};
