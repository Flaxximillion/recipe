import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Callbacks } from "../../shared/utils/api";
import { Box, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Recipe } from "../../shared/types";

interface Api {
  getById: (id: number | string, { onSuccess, onError }: Callbacks) => void;
}

interface RecipePage {
  api: Api;
  onError: () => void;
}

const RecipePageHeader = styled(Box)(() => ({
  backgroundColor: "darkgrey",
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const RecipeThumbnail = styled("img")(() => ({
  width: "100%",
  height: "auto",
  marginTop: "50px",
  maxHeight: "350px",
  objectFit: "cover",
}));

const RecipePage = ({ api, onError }: RecipePage) => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>({
    idMeal: 0,
    strMeal: "",
    strMealThumb: "",
  });

  useEffect(() => {
    api.getById(id, {
      onSuccess: (res: Recipe[]) => setRecipe(res[0]),
      onError,
    });
  }, []);

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      // @ts-ignore
      if (recipe[`strMeasure${i}`]) {
        ingredients.push(
          // @ts-ignore
          recipe[`strMeasure${i}`] + " " + recipe[`strIngredient${i}`]
        );
      } else {
        break;
      }
    }
    return ingredients;
  };

  return (
    <>
      <RecipePageHeader>
        <Box ml={3}>
          <Link href="/" underline="none" color="textPrimary">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </Box>
        <Box mr={3}>
          <FontAwesomeIcon icon={faHeart} />
        </Box>
      </RecipePageHeader>
      <Box>
        <RecipeThumbnail
          src={recipe.strMealThumb}
          alt={`Picture of ${recipe.strMeal}`}
        />
        <Box px={2} pt={1} pb={10}>
          <Box py={1}>
            <Typography variant="h4">{recipe.strMeal}</Typography>
          </Box>
          {renderIngredients().map((ingredient) => (
            <Typography>{ingredient}</Typography>
          ))}
          <Box py={1}>
            <Typography variant="h4">Directions</Typography>
          </Box>
          <Typography>{recipe.strInstructions}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default RecipePage;
