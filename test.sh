echo "================================================================================"
echo "1. Create new post"

curl -XPOST -H "Content-type: application/json" -d '{
  "title": "A new blog post!",
  "content": "Lorem ipsum"
}' 'http://localhost:3000/post' && echo

echo
echo "2. New post fails because empty content doesn't validate"

curl -XPOST -H "Content-type: application/json" -d '{
  "title": "A second blog post!",
  "content": ""
}' 'http://localhost:3000/post' && echo

echo
echo "3. New post with optional payload param _id specified"

curl -XPOST -H "Content-type: application/json" -d '{
  "title": "Third post",
  "content": "I am a blog post",
  "_id": "id1"
}' 'http://localhost:3000/post' && echo

echo
echo "4. List all of the posts"

curl -XGET 'http://localhost:3000/post' && echo

echo
echo "5. Get post by ID"

curl -XGET 'http://localhost:3000/post/id1' && echo

echo
echo "5. Update post"

curl -XPUT -H "Content-type: application/json" -d '{
    "title": "A new title"
}' 'http://localhost:3000/post/id1' && echo

echo
echo "================================================================================"


