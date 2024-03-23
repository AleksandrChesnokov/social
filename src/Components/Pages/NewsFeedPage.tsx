import React, { useEffect, useState } from "react";
import { List } from "antd";

interface Article {
  title: string;
  description: string;
  content: string;
  comments: number;
}

export const NewsFeedPage = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getNews() {
      try {
        let news = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=a4a0187038134eb1af0fbbec79048d9b"
        );
        let res = await news.json();
        setNewsData(res.articles);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    getNews();
  }, []);

  return (
    <>
      <List
        locale={{ emptyText: "Пусто" }}
        loading={loading}
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          paddingBottom: "15px",
        }}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={newsData}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={
                <a href={item.url} target="_blank ">
                  {item.title}
                </a>
              }
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
};
