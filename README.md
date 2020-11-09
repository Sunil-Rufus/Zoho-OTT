# Zoho-OTT


- OTT platform that authenticates subscribers and admin
- Only Admin has the authority to add contents
- Normal subscribers can watch, rate and filter movies of their choice.
- They can sort the movies based on time and rating.
- They can also filter movies based on genre and language.
- All the data has been stored in web local storage.

# Movie data model:
- [{
  "id",
  "movie",
  "url",
  "genre",
  "rating",
  "language",
  "date"
  "viewCount"
  }]
  
# User Data Model:
[{
  "username",
  "email",
  "password"
  }]
  
# Highlights:
- URL tampering has been avoided, only admin with specific rights could access it
- Password has been encrypted for security purposes 
Note: Password is still exposed due to local storage

# Future works:
- User data model requires slight changes
- Using movie id can note the movies watched by user and give suggestions on next movies.
