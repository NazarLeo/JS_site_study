const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', ''); 

personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

const a = prompt('Один из последних фильмов?', ''),
      b = prompt('На сколькько оцените?', ''),
      c = prompt('Один из последних фильмов?', ''),
      d = prompt('На сколькько оцените?', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);