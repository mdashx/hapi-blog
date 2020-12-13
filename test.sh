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
echo "4. New post with optional payload param encrypt set to true"

curl -XPOST -H "Content-type: application/json" -d '{
  "title": "Encrypted blog post",
  "content": "A secret blog post",
  "encrypt": true
}' 'http://localhost:3000/post' && echo


echo
echo "5. List all of the posts"

curl -XGET 'http://localhost:3000/post' && echo

echo
echo "6. Get post by ID"

curl -XGET 'http://localhost:3000/post/id1' && echo

echo
echo "7. Update post title"

curl -XPUT -H "Content-type: application/json" -d '{
    "title": "A new title"
}' 'http://localhost:3000/post/id1' && echo

echo
echo "7. Update post with title and encryption"

curl -XPUT -H "Content-type: application/json" -d '{
   "title": "Now I am secret",
   "content": "Encrypt this content",
    "encrypt": true
}' 'http://localhost:3000/post/id1' && echo

echo
echo "================================================================================"


