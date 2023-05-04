json.user do
    json.extract! @user, :id, :email, :username, :first_name, :last_name, :created_at
    json.profPic @user.photo.url 
end
