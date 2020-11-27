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
            string_agg(DISTINCT '{"actor_id": ' || ac.id || ', "actor_name": "' || ac.name || '"}', ', ') AS actors_name
       FROM shows sh
         LEFT JOIN show_genres sg ON sh.id = sg.show_id
         LEFT JOIN genres ge ON sg.genre_id = ge.id
         LEFT JOIN show_characters sc ON sh.id = sc.show_id
         LEFT JOIN actors ac ON sc.actor_id = ac.id
      GROUP BY sh.id;