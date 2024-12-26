import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import axios from 'axios';

function Media({ loading = false, newsItem }) {
  return (
    <Card sx={{ minWidth: "60%", m: 2 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt="News Avatar"
              src="https://img.icons8.com/color/48/news.png" // Placeholder avatar
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            newsItem.headline
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            newsItem.date
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 390 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="390"
          image={newsItem.image || 'https://via.placeholder.com/512'} // Fallback for missing images
          alt={newsItem.headline}
        />
      )}
      <CardContent>
        {loading ? (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
            {newsItem.news}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function Resource() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/create-med-news');
        const newsData = Array.isArray(response.data) ? response.data : [response.data];
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      {loading
        ? Array.from({ length: 2 }).map((_, index) => <Media key={index} loading />)
        : news.map((newsItem) => (
            <Media key={newsItem.id} newsItem={newsItem} />
          ))}
    </Box>
  );
}
