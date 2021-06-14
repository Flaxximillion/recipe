import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { styled } from "@material-ui/core/styles";
import { Recipe } from "../../shared/types";
import HomeRecipeItem from "./HomeRecipeItem";

interface Home {
  loadingRecipes: boolean;
  recipes: Recipe[];
  searchQuery: string;
}

const RECIPES_PER_PAGE = 5;

const BackdropContainer = styled(Box)(({ theme }) => ({
  backgroundImage: "url(./assets/home-background.jpeg)",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  marginTop: "70px",

  [theme.breakpoints.down("sm")]: {
    height: "75vh",
    marginTop: "0",
  },
}));

const BackdropLogo = styled("img")(() => ({
  width: "50%",
  maxWidth: "250px",
  height: "auto",
}));

const RecipesGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    margin: 0,
    width: "100%",
  },
}));

const Home = ({ loadingRecipes, recipes, searchQuery }: Home) => {
  const [paginatedRecipes, setPaginatedRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPaginatedRecipes(
      recipes.slice(
        (currentPage - 1) * RECIPES_PER_PAGE,
        (currentPage - 1) * RECIPES_PER_PAGE + RECIPES_PER_PAGE
      )
    );
  }, [currentPage, recipes]);

  return (
    <>
      <BackdropContainer>
        <BackdropLogo src="./assets/logo.png" />
      </BackdropContainer>
      <Box mt={3}>
        <Typography
          align="center"
          variant="h4"
          color="textSecondary"
          gutterBottom
        >
          <i>
            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Recipes of the Day"}
          </i>
        </Typography>
        {recipes.length > 0 && !loadingRecipes ? (
          <RecipesGrid container spacing={3} justify="center">
            {paginatedRecipes.map((recipe: Recipe) => (
              <Grid item xs={12} md={4} lg={3} key={recipe.idMeal}>
                <HomeRecipeItem recipe={recipe} />
              </Grid>
            ))}
          </RecipesGrid>
        ) : (
          <Typography align="center" variant="subtitle1" color="textSecondary">
            {loadingRecipes ? "Searching..." : "No recipes found."}
          </Typography>
        )}

        {recipes.length > 5 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={3}
          >
            <Pagination
              count={Math.ceil(recipes.length / RECIPES_PER_PAGE)}
              page={currentPage}
              onChange={(
                e: React.ChangeEvent<unknown>,
                page: React.SetStateAction<number>
              ) => {
                setCurrentPage(page);
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
