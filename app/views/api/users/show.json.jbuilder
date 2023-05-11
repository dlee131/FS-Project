json.extract! @user, :id, :email, :username, :first_name, :last_name, :created_at
json.profilePic @user.photo.url 
