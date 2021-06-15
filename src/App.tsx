import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Container } from "@material-ui/core";
import Api from "./shared/utils/api";
import RecipePage from "./pages/RecipePage/RecipePage";
import Search from "./components/Search";
import { styled } from "@material-ui/core/styles";

const AppContainer = styled(Container)(() => ({
  backgroundColor: "#fff",
  height: "100%",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  flex: 1,
}));

// Used to debounce searches
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// Most of the state management is here. Eventually should be extrapolated into a separate file or library.
export default function App() {
  const [state, setState] = useState({
    api: new Api(),
    loadingRecipes: false,
    randomRecipes: [],
    searchedRecipes: [],
    // No actual error handling at this point. Intention was to use this field to pop up a toast component on API request error.
    erroredField: "",
  });

  // Minor performance improvement if we extrapolate a state element that a hook has as a dependency
  const [searchQuery, setSearchQuery] = useState("");

  const contextualRecipes = () => {
    if (!searchQuery) {
      return state.randomRecipes;
    } else if (searchQuery && state.searchedRecipes.length > 0) {
      return state.searchedRecipes;
    }
    return [];
  }

  const handleSetState = (newState: object) => {
    setState({
      ...state,
      ...newState,
    });
  };

  const handleSearch = debounce(() => {
    state.api.getBySearch(searchQuery, {
      onSuccess: (res) =>
        handleSetState({
          searchedRecipes: res || [],
          loadingRecipes: false,
        }),
      onError: () =>
        handleSetState({
          erroredField: `query ${searchQuery}`,
          loadingRecipes: false,
        }),
    });
  }, 250);

  useEffect(() => {
    if (searchQuery && !state.loadingRecipes) {
      handleSetState({ loadingRecipes: true });
      handleSearch();
    } else if (!searchQuery) {
      handleSetState({ loadingRecipes: false });
    }
  }, [searchQuery]);

  // Initial call to retrieve random recipes.
  useEffect(() => {
    handleSetState({ loadingRecipes: true });
    state.api.getRandom({
      onSuccess: (res) =>
        handleSetState({
          randomRecipes: res,
          loadingRecipes: false,
        }),
      onError: () =>
        handleSetState({
          erroredField: "home page recipes",
          loadingRecipes: false,
        }),
    });
  }, []);

  return (
    <>
      <AppContainer disableGutters>
        <Switch>
          <Route exact path="/">
            <Home
              loadingRecipes={state.loadingRecipes}
              recipes={contextualRecipes()}
              searchQuery={searchQuery}
            />
          </Route>
          <Route path="/recipe/:id">
            <RecipePage
              api={state.api}
              onError={() => handleSetState({ erroredField: "recipe" })}
            />
          </Route>
        </Switch>
      </AppContainer>
      <Search
        loadingRecipes={state.loadingRecipes}
        searchedRecipes={
          searchQuery && !state.loadingRecipes
            ? state.searchedRecipes
            : []
        }
        searchQuery={searchQuery}
        setSearchQuery={(searchQuery: string) => setSearchQuery(searchQuery)}
      />
    </>
  );
}
