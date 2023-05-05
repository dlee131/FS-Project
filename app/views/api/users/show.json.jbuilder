json.user do
    json.extract! @user, :id, :email, :username, :first_name, :last_name, :photo, :created_at
end
