SELECT
  "Like".id,
  "Like"."postId",
  count("Like"."userId") AS count
FROM
  (
    "Like"
    JOIN "Post" ON (("Like"."postId" = "Post".id))
  )
WHERE
  ("Post".id = "Like"."postId")
GROUP BY
  "Like".id,
  "Like"."postId";