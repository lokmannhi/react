import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import BackButton from "../common/BackButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const AnimeList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 250);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime?${
      debouncedSearch ? `q=${debouncedSearch}&` : ""
    }page=${page}&limit=${limit}`,
    { cancelRequest: true }
  );

  const anime = data?.data || [];
  const pagination = data?.pagination || {};

  const goToFirst = () => setPage(1);
  const goToPrev = () => setPage((prev) => Math.max(1, prev - 1));
  const goToNext = () =>
    setPage((prev) => (pagination.has_next_page ? prev + 1 : prev));
  const goToLast = () => setPage(pagination.last_visible_page || page);

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        py: 4,
        minHeight: "100vh",
      }}>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Ensures space between back button and title
          mb: 4,
          width: "100%",
        }}>
        <BackButton /> {/* Back Button aligned to the left */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", flexGrow: 1 }}>
          Anime List
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Search Anime"
          variant="outlined"
          value={search}
          onChange={(e) => {
            const value = e.target.value.trimStart();
            setSearch(value);
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {anime.map((item) => (
          <Grid item key={item.mal_id}>
            <Link
              to={`/anime/${item.mal_id}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <Card
                sx={{
                  width: 200,
                  height: 300,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}>
                <CardMedia
                  component="img"
                  image={item.images.jpg.image_url}
                  alt={item.title}
                  sx={{
                    height: "80%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    height: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1,
                  }}>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    fontWeight="bold"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 4,
        }}>
        <Button onClick={goToFirst} disabled={page === 1}>
          |&lt;
        </Button>
        <Button onClick={goToPrev} disabled={page === 1}>
          &lt;
        </Button>
        <Typography sx={{ mx: 2 }}>
          Page {pagination.current_page} of {pagination.last_visible_page}
        </Typography>
        <Button onClick={goToNext} disabled={!pagination.has_next_page}>
          &gt;
        </Button>
        <Button onClick={goToLast} disabled={!pagination.has_next_page}>
          &gt;|
        </Button>
      </Box>
    </Container>
  );
};

export default AnimeList;
