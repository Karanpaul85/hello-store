import mongoose from "mongoose";

const newsModal = mongoose.Schema(
  {
    article_id: String,
    title: String,
    link: String,
    keywords: mongoose.Schema.Types.Mixed,
    creator: Array,
    video_url: String,
    description: String,
    content: String,
    pubDate: String,
    image_url: String,
    source_id: String,
    source_priority: String,
    source_url: String,
    source_icon: String,
    language: String,
    country: Array,
    category: Array,
    ai_tag: String,
    sentiment: String,
    sentiment_stats: String,
    ai_region: String,
  },
  {
    timestamps: true,
  }
);
export const allNews =
  mongoose.models.allNews || mongoose.model("allNews", newsModal);
