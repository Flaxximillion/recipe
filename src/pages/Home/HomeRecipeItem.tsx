import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Hidden,
  Link,
  Typography,
} from "@material-ui/core";
import { Recipe } from "../../shared/types";
import { styled } from "@material-ui/core/styles";

const HomeRecipeCardThumbnail = styled(CardMedia)(() => ({
  height: 0,
  paddingTop: "56.25%",
}));

const MobileHomeRecipeCardThumbnail = styled("img")(() => ({
  objectFit: "cover",
  width: "100%",
  height: "auto",
  maxHeight: "225px",
}));

const HomeRecipeItem = ({ recipe }: { recipe: Recipe }) => (
  <>
    <Link
      href={`/recipe/${recipe.idMeal}`}
      underline="none"
      color="textPrimary"
    >
      <Hidden smUp>
        <Box mb={3}>
          <Typography align="center" variant="h6">
            {recipe.strMeal}
          </Typography>
        </Box>
        <MobileHomeRecipeCardThumbnail src={recipe.strMealThumb} />
      </Hidden>
      <Hidden xsDown>
        <Card>
          <CardHeader
            title={recipe.strMeal}
            titleTypographyProps={{ align: "center", variant: "body1" }}
          />
          <HomeRecipeCardThumbnail
            image={recipe.strMealThumb}
            title={`Picture of ${recipe.strMeal}`}
          />
        </Card>
      </Hidden>
    </Link>
  </>
);

export default HomeRecipeItem;
