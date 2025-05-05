import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Container, Typography, Box, Paper } from "@mui/material";
import BackButton from "../common/BackButton";

const AnimeDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime/${id}`
  );
  const anime = data?.data;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const colorList = shuffleArray([
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#d7aefb",
  ]);

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: "100vh" }}>
      <BackButton />

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}

      {!loading && anime && (
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mt: 2 }}>
          {/* Anime image */}
          <Box sx={{ flex: "1 1 300px" }}>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>

          {/* Stats grid */}
          <Box sx={{ flex: "1 1 300px" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}>
              {[
                { label: "Favorites", value: anime.favorites },
                { label: "Members", value: anime.members },
                { label: "Popularity", value: anime.popularity },
                { label: "Rank", value: anime.rank },
                { label: "Score", value: anime.score },
                { label: "Scored By", value: anime.scored_by },
              ].map((stat, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    width: "150px",
                    height: "75px",
                    backgroundColor: colorList[index],
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {stat.label}
                  </Typography>
                  <Typography variant="h6">{stat.value}</Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {!loading && anime && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Synopsis
          </Typography>
          <Typography variant="body1">{anime.synopsis}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default AnimeDetail;
