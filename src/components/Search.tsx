import React, { useState } from "react";
import { Box, Hidden, Input, Link, Paper, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Recipe } from "../shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = styled(Box)(() => ({
  backgroundColor: "#fff",
  position: "fixed",
  top: "0",
  left: "0",
  height: "100vh",
  width: "100%",
  overflowY: "scroll",
}));

const SearchInputWrapper = styled(Box)(() => ({
  backgroundColor: "#292929",
}));

const SearchInput = styled(Input)(() => ({
  color: "#fff",
  height: "100%",
  padding: "10px 40px",
}));

const SearchButtonWrapper = styled(Paper)(() => ({
  backgroundColor: "#F20A0E",

  width: "50px",
  height: "50px",
  borderRadius: "50%",
  position: "fixed",
  bottom: "20px",
  right: "20px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SearchButton = styled(FontAwesomeIcon)(() => ({
  color: "#fff",
}));

const SearchHeader = styled(Box)(() => ({
  backgroundColor: "#292929",
  width: "100%",
  height: "70px",
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  top: "0",
  left: "0",
}));

interface Search {
  loadingRecipes: boolean;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  searchedRecipes: Recipe[];
}

const Search = ({
  loadingRecipes,
  searchedRecipes,
  searchQuery,
  setSearchQuery,
}: Search) => {
  const [showMobileSearchMenu, setShowMobileSearchMenu] = useState(false);

  return (
    <>
      {showMobileSearchMenu && (
        <SearchContainer>
          <SearchInputWrapper>
            <SearchInput
              disableUnderline
              fullWidth
              placeholder="I'm craving..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputWrapper>
          {!loadingRecipes ? (
            searchedRecipes.map((recipe: Recipe) => (
              <Box py={1} pr={2} pl={3}>
                <Link
                  href={`/recipe/${recipe.idMeal}`}
                  underline="none"
                  color="textPrimary"
                >
                  <Typography>{recipe.strMeal}</Typography>
                </Link>
              </Box>
            ))
          ) : (
            <Box pl={3}>
              <Typography variant="subtitle1">Loading...</Typography>
            </Box>
          )}
        </SearchContainer>
      )}
      <Hidden mdUp>
        <SearchButtonWrapper>
          <SearchButton
            icon={showMobileSearchMenu ? faTimes : faSearch}
            size="lg"
            onClick={() => setShowMobileSearchMenu(!showMobileSearchMenu)}
          />
        </SearchButtonWrapper>
      </Hidden>
      <Hidden smDown>
        <SearchHeader>
          <SearchInputWrapper>
            <SearchInput
              disableUnderline
              fullWidth
              placeholder="I'm craving..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputWrapper>
        </SearchHeader>
      </Hidden>
    </>
  );
};

export default Search;
