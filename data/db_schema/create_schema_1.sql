CREATE TABLE IF NOT EXISTS shows (
    id       SERIAL PRIMARY KEY NOT NULL,
    title    VARCHAR(200)        NOT NULL,
    year     DATE                NULL,
    overview TEXT,
    runtime  SMALLINT,
    trailer  VARCHAR(200),
    homepage VARCHAR(200),
    rating   NUMERIC
);


CREATE TABLE IF NOT EXISTS genres (
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30)        NOT NULL
);


CREATE TABLE IF NOT EXISTS actors (
    id        SERIAL PRIMARY KEY NOT NULL,
    name      VARCHAR(200)        NOT NULL,
    birthday  DATE,
    death     DATE,
    biography TEXT
);


CREATE TABLE IF NOT EXISTS seasons (
    id            SERIAL PRIMARY KEY NOT NULL,
    season_number SMALLINT            NOT NULL,
    title         VARCHAR(200),
    overview      TEXT,
    show_id       INTEGER             NOT NULL
);


CREATE TABLE IF NOT EXISTS show_genres (
    id       SERIAL PRIMARY KEY NOT NULL,
    show_id  INTEGER            NOT NULL,
    genre_id INTEGER            NOT NULL
);


CREATE TABLE IF NOT EXISTS show_characters (
    id             SERIAL PRIMARY KEY NOT NULL,
    show_id        INTEGER            NOT NULL,
    actor_id       INTEGER            NOT NULL,
    character_name VARCHAR(200)       NOT NULL
);


CREATE TABLE IF NOT EXISTS episodes (
    id             SERIAL PRIMARY KEY NOT NULL,
    title          VARCHAR(200),
    episode_number SMALLINT            NOT NULL,
    overview       TEXT,
    season_id      INTEGER             NOT NULL
);


CREATE TABLE IF NOT EXISTS users
(
  users_id bigserial NOT NULL,
  users_login varchar(180) NOT NULL UNIQUE,
  users_pass varchar(100),
  users_registration timestamp DEFAULT NOW() NOT NULL
);

ALTER TABLE users ADD CONSTRAINT pk_users
  PRIMARY KEY (users_id);


ALTER TABLE ONLY seasons
    ADD CONSTRAINT fk_seasons_show_id FOREIGN KEY (show_id) REFERENCES shows(id);


ALTER TABLE ONLY episodes
    ADD CONSTRAINT fk_episodes_season_id FOREIGN KEY (season_id) REFERENCES seasons(id);


ALTER TABLE ONLY show_characters
    ADD CONSTRAINT fk_show_characters_actor_id FOREIGN KEY (actor_id) REFERENCES actors(id);


ALTER TABLE ONLY show_characters
    ADD CONSTRAINT fk_show_characters_show_id FOREIGN KEY (show_id) REFERENCES shows(id);


ALTER TABLE ONLY show_genres
    ADD CONSTRAINT fk_show_genres_genre_id FOREIGN KEY (genre_id) REFERENCES genres(id);

ALTER TABLE ONLY show_genres
    ADD CONSTRAINT fk_show_genres_show_id FOREIGN KEY (show_id) REFERENCES shows(id);


CREATE VIEW show_details_view AS
	SELECT sh.id,
            sh.title,
			sh.year,
            round(sh.rating, 1) AS round_rating,
			sh.runtime,
            sh.rating,
            sh.overview,
			sh.trailer,
			sh.homepage,
            string_agg(DISTINCT '{"genre_id": ' || ge.id || ', "genre_name": "' || ge.name || '"}', ', ') AS genres_name,
            string_agg(DISTINCT '{"actor_id": ' || ac.id || ', "actor_name": "' || ac.name || '"}', ', ') AS actors_name,
			string_agg(DISTINCT '{"char_id": ' || sc.actor_id || ', "char_name": "' || sc.character_name || '"}', ', ') AS characters_name
       FROM shows sh
         LEFT JOIN show_genres sg ON sh.id = sg.show_id
         LEFT JOIN genres ge ON sg.genre_id = ge.id
         LEFT JOIN show_characters sc ON sh.id = sc.show_id
         LEFT JOIN actors ac ON sc.actor_id = ac.id
      GROUP BY sh.id;


CREATE VIEW genre_shows_view AS
    SELECT  sh.id AS sh_id,
			sh.title AS sh_title,
			sh."year" AS sh_year,
			sh.overview AS sh_overview,
			sh.runtime AS sh_runtime,
			sh.trailer AS sh_trailer,
			sh.homepage AS sh_homepage,
			ROUND(sh.rating, 1) AS sh_rating,
			ge."name" AS ge_name,
			ge.id AS ge_id
	    FROM shows AS sh
            INNER JOIN show_genres AS sg ON sh.id = sg.show_id
            INNER JOIN genres AS ge ON sg.genre_id = ge.id;


SELECT setval('shows_id_seq', 121107);
SELECT setval('actors_id_seq', 987437);
SELECT setval('episodes_id_seq', 2749328);
SELECT setval('genres_id_seq', 34);
SELECT setval('seasons_id_seq', 151822);
SELECT setval('show_characters_id_seq', 8178);
SELECT setval('show_genres_id_seq', 2550);