json.user do
    json.extract! @user, :id, :email, :username, :first_name, :last_name, :created_at
    if @user.photo.attached?
      json.profPic url_for(@user.photo)
    else
      json.profPic nil
    end
end
  
