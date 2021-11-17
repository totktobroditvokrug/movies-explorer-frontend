export function getMoviesFromArray(searchString, arr) {
    const regexp = new RegExp(`${searchString}`, "gi");
    // console.log("Utils-> регулярное выражение:", regexp);
    // console.log("Utils-> Массив полученных фильмов:", arr);
    const arrFoundMovies = arr.filter(
      (item) =>
        regexp.test(item.description) ||
        regexp.test(item.nameRU) ||
        regexp.test(item.nameEN)
    );
    // console.log("Utils-> Массив отфильтрованных фильмов:", arrFoundMovies);
      return arrFoundMovies;
  }