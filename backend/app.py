from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Flask, request, redirect, url_for, abort, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from flask_cors import CORS
from models import db, User, Post, Comment, Like, Notification
import datetime
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, current_user,
                                get_jwt, get_jwt_identity, set_access_cookies,
                                unset_jwt_cookies)

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = "845jdbvjdb8422kds**jbsdfjds"


# Connect to DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chatnet.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# with app.app_context():
#     db.create_all()


app.config['JWT_SECRET_KEY'] = 'jhdHB98Biu*&uY*^vGuhu*&^*yCTD^%^7JBJ'
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
# app.config["JWT_COOKIE_SECURE"] = False
# app.config["JWT_COOKIE_CSRF_PROTECT"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)


# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.datetime.now(timezone.utc)
#         target_timestamp = datetime.datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             set_access_cookies(response, access_token)
#         return response
#     except (RuntimeError, KeyError):
#         # Case where there is not a valid JWT. Just return the original response
#         return response

@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify(code="dave", err="I can't let you do that"), 401

@jwt.user_identity_loader
def user_identity_loader(user):
    return user.username

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(username=identity).one_or_none()


@app.route('/', methods=['GET'])
@jwt_required()
def home():
    try:
        return jsonify(
            username=current_user.username,
            email=current_user.email,
            first_name=current_user.first_name,
            last_name=current_user.last_name,
            bio=current_user.bio,
            dob=current_user.dob,
            profile_picture=current_user.profile_picture,
            city=current_user.city,
            country=current_user.country,
            account_private=current_user.account_private
        ), 200
    except Exception as e:
        return jsonify(error=str(e)), 400

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('firstname')
        last_name = data.get('lastname')
        bio = data.get('bio')
        dob = data.get('dob')
        if dob:
            dob = datetime.datetime(day=int(dob["day"]), month=int(dob["month"]), year=int(dob["year"]))
        profile_picture = data.get('profile_picture')
        city = data.get('city')
        country = data.get('country')
        account_private = bool(data.get('account_private'))

        if not username or not password:
            raise Exception("Invalid Username or Password.")

        with app.app_context():
            user = db.session.query(User).filter_by(username=username).first()
        if user:
            raise Exception("Username already exists. Log In instead.")

        hashed_pwd = generate_password_hash(
            password,
            method='pbkdf2:sha256',
            salt_length=8
        )
        new_user = User(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = hashed_pwd,
            bio = bio,
            dob = dob,
            profile_picture = profile_picture,
            city = city,
            country = country,
            account_private = account_private
        )
        with app.app_context():
            db.session.add(new_user)
            db.session.commit()

        with app.app_context():
            user = db.session.query(User).filter_by(username=username).first()
        access_token = create_access_token(identity=user)
        # set_access_cookies(response, access_token)
        return jsonify({'message': 'Successfully signed up.',
                        'access_token': access_token}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 400



@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        with app.app_context():
            user = db.session.query(User).filter_by(username=username).first()
            if user:
                if check_password_hash(user.password, password):
                    access_token = create_access_token(identity=user)
                    # set_access_cookies(response, access_token)
                    return jsonify({'message': 'Successfully logged in.',
                                    'access_token': access_token}), 200
                else:
                    raise Exception("Incorrect password.")
            else:
                raise Exception("Username not found.")

    except Exception as e:
        if e.args[0] == "Incorrect password.":
            return jsonify({'message': str(e)}), 401
        elif e.args[0] == "Username not found.":
            return jsonify({'message': str(e)}), 404
        return jsonify({'message': str(e)}), 400

@app.route('/logout', methods=['POST'])
def logout():
    try:
        response = jsonify({"msg": "logout successful"})
        # unset_jwt_cookies(response)
        return response, 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/profile/<string:username>', methods=['GET'])
@jwt_required()
def get_profile(username):
    try:
        with app.app_context():
            user = db.session.query(User).filter_by(username=username).first()
        if user:
            return jsonify(
                username=user.username,
                first_name=user.first_name,
                last_name=user.last_name,
                bio=user.bio,
                profile_picture=user.profile_picture,
                city=user.city,
                country=user.country,
                account_private=user.account_private
            ), 200
        else:
            raise Exception("User not found.")

    except Exception as e:
        if e.args[0] == "User not found.":
            return jsonify(message=str(e)), 404
        return jsonify({'message': str(e)}), 400

@app.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    try:
        data = request.get_json()
        password = data.get('password')
        update = data.get('update')
        email = update.get('email')
        update_password = update.get('password')
        first_name = update.get('firstname')
        last_name = update.get('lastname')
        bio = update.get('bio')
        dob = update.get('dob')
        if dob:
            dob = datetime.datetime(day=int(dob["day"]), month=int(dob["month"]), year=int(dob["year"]))
        profile_picture = update.get('profile_picture')
        city = update.get('city')
        country = update.get('country')
        account_private = update.get('account_private')
        if check_password_hash(current_user.password, password):
            if update_password:
                current_user.password = update_password
            if email:
                current_user.email = email
            if first_name:
                current_user.first_name = first_name
            if last_name:
                current_user.lastname = last_name
            if bio:
                current_user.bio = bio
            if dob:
                current_user.dob = dob
            if profile_picture:
                current_user.profile_picture = profile_picture
            if account_private:
                current_user.account_private = account_private
            if city:
                current_user.city = city
            if country:
                current_user.country = country
            db.session.commit()
            return jsonify({'message': 'Updated user successfully.'}), 200
        else:
            return jsonify(message="Incorrect password."), 401
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/update_username", methods=['PUT'])
@jwt_required()
def update_username():
    try:
        data = request.get_json()
        password = data['password']
        update_username = data['username']
        if check_password_hash(current_user.password, password):
            for post in current_user.posts:
                post.username = update_username
                db.session.commit()
            for comment in current_user.comments:
                comment.username = update_username
                db.session.commit()
            for like in current_user.likes:
                like.username = update_username
                db.session.commit()
            for notification in current_user.notifications:
                notification.username = update_username
                db.session.commit()
            current_user.username = update_username
            db.session.commit()
            user = db.session.query(User).filter_by(username=update_username).first()
            access_token = create_access_token(identity=user)
            return jsonify(access_token=access_token,
                           message="Successfully updated username"), 200
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/delete_user", methods=['POST'])
@jwt_required()
def delete_user():
    try:
        data = request.get_json()
        # username = data.get('username')
        password = data.get('password')
        # with app.app_context():
            # user = db.session.query(User).filter_by(username=username).first()
            # if user:
            #     if check_password_hash(user.password, password):
            #         db.session.delete(user)
            #         db.session.commit()
            #         response = jsonify(message="Deleted successfully")
            #         return response, 200
            #     else:
            #         raise Exception("Incorrect password.")
            # else:
            #     raise Exception("User not found")
        if check_password_hash(current_user.password, password):
            db.session.delete(current_user)
            db.session.commit()
            return jsonify(message="User deleted."), 200
        else:
            return jsonify(message="Incorrect password."), 401

    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/create_post", methods=['POST'])
@jwt_required()
def create_post():
    try:
        data = request.get_json()
        new_post = Post(
            username=current_user.username,
            post_text=data.get('post_text'),
            image=data.get('image'),
            location=data.get('location'),
            timestamp=datetime.datetime.now()
        )
        with app.app_context():
            db.session.add(new_post)
            db.session.commit()
        return jsonify(mesage="Post created successfully"), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/update_post/<post_id>", methods=['PUT'])
@jwt_required()
def update_post(post_id):
    try:
        for post in current_user.posts:
            if post.post_id == post_id:
                data = request.get_json()
                if data.get('post_text'):
                    post.post_text = data.get('post_text')
                if data.get('image'):
                    post.image = data.get('image')
                if data.get('location'):
                    post.location = data.get('location')
                if data.get('timestamp'):
                    post.timestamp = data.get('timestamp')
                db.session.commit()
                return jsonify(message="Post updated successfully"), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400


@app.route("/delete_post/<post_id>", methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    try:
        for post in current_user.posts:
            if post.post_id == post_id:
                db.session.delete(post)
                db.session.commit()
                return jsonify(message="Post deleted successfully"), 200
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/get_post/<post_id>", methods=['GET'])
@jwt_required()
def get_post(post_id):
    try:
        with app.app_context():
            post = db.session.query(Post).filter_by(post_id=post_id).first()
            if post:
                return jsonify(
                    username=post.username,
                    post_text=post.post_text,
                    image=post.image,
                    location=post.location,
                    timestamp=post.timestamp,
                ), 200
            else:
                raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/get_all_posts/", methods=['GET'])
@jwt_required()
def get_all_posts():
    try:
        posts = current_user.posts
        return jsonify(posts=[{
            "post_id": post.post_id,
            "post_text": post.post_text,
            "image": post.image,
            "location": post.location,
            "timestamp": post.timestamp,
            "username": post.username
        } for post in posts]), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/comment/<post_id>", methods=['POST'])
@jwt_required()
def comment(post_id):
    try:
        post = db.session.query(Post).filter_by(post_id=post_id).first()
        if post:
            data = request.get_json()
            content = data.get('content')
            if content:
                comment = Comment(
                    post_id=post_id,
                    content=content,
                    timestamp=datetime.datetime.now(),
                    username=current_user.username
                )
                db.session.add(comment)
                db.session.commit()
                return jsonify(message="Comment added successfully"), 200
            else:
                raise Exception("No content.")
        else:
            raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/delete_comment/<comment_id>", methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    try:
        comment = db.session.query(Comment).filter_by(comment_id=comment_id).first()
        if comment:
            post = db.session.query(Post).filter_by(post_id=comment.post_id).first()
            if comment.username == current_user.username or post.username == current_user.username:
                db.session.delete(comment)
                db.session.commit()
                return jsonify(message="Comment deleted successfully"), 200
            else:
                return jsonify(message="User not authorized."), 401
        else:
            raise Exception("Comment not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/get_comments/<post_id>", methods=['GET'])
@jwt_required()
def get_comments(post_id):
    try:
        post = db.session.query(Post).filter_by(post_id=post_id).first()
        if post:
            comments = []
            for comment in post.comments:
                add_comment = {
                    'comment_id': comment.comment_id,
                    'timestamp': comment.timestamp,
                    'username': comment.username,
                    'post_id': comment.post_id,
                    'content': comment.content
                }
                comments.append(add_comment)
            return jsonify(comments=comments), 200
        else:
            raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/like/<post_id>", methods=['POST'])
@jwt_required()
def like_post(post_id):
    try:
        post = db.session.query(Post).filter_by(post_id=post_id).first()
        if post:
            for like in post.likes:
                if like.username == current_user.username:
                    db.session.delete(like)
                    db.session.commit()
                    return jsonify(message="Disliked successfully"), 200
            like = Like(
                post_id=post_id,
                username=current_user.username,
                timestamp=datetime.datetime.now(),
            )
            db.session.add(like)
            db.session.commit()
            return jsonify(message="Liked successfully"), 200
        else:
            raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/get_likes/<post_id>", methods=['GET'])
@jwt_required()
def get_likes(post_id):
    try:
        post = db.session.query(Post).filter_by(post_id=post_id).first()
        if post:
            likes = []
            for like in post.likes:
                add_like = {
                    "like_id": like.like_id,
                    "username": like.username,
                    "timestamp": like.timestamp,
                    "post_id": post_id
                }
                likes.append(add_like)
            return jsonify(likes=likes), 200
        else:
            raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/search_users/<filter>", methods=['GET'])
@jwt_required()
def search_users(filter):
    try:
        users_list = []
        users = db.session.query(User).filter(User.username.like(filter)).limit(5)
        for user in users:
            add_user = {
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "profile_picture": user.profile_picture
            }
            users_list.append(add_user)
        users = db.session.query(User).filter(User.first_name.like(filter)).limit(5)
        for user in users:
            add_user = {
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "profile_picture": user.profile_picture
            }
            users_list.append(add_user)
        temp = []
        [temp.append(user) for user in users_list if user not in temp]
        users_list = temp
        return jsonify(users=users_list), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/follow_user/<username>", methods=['POST'])
@jwt_required()
def follow_user(username):
    try:
        user = db.session.query(User).filter_by(username=username).first()
        if user:
            if user in current_user.following:
                return jsonify({'message': 'User already followed.'}), 400
            else:
                current_user.following.append(user)
                db.session.commit()
                return jsonify({'message': 'User successfully followed.'}), 200
        else:
            return jsonify("User not found"), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/unfollow_user/<username>", methods=['POST'])
@jwt_required()
def unfollow_user(username):
    try:
        user = db.session.query(User).filter_by(username=username).first()
        if user:
            if user in current_user.following:
                current_user.following.remove(user)
                db.session.commit()
                return jsonify({'message': 'User unfollowed successfully'}), 200
            else:
                return jsonify({'message': 'User not followed.'}), 400
        else:
            return jsonify("User not found"), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/get_following", methods=['GET'])
@jwt_required()
def get_following():
    try:
        following_list = []
        following = current_user.following
        for user in following:
            list_element = {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'profile_picture': user.profile_picture
            }
            following_list.append(list_element)
        return jsonify(following=following_list), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/get_followers", methods=['GET'])
@jwt_required()
def get_followers():
    try:
        followers_list = []
        followers = current_user.followers
        for user in followers:
            list_element = {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'profile_picture': user.profile_picture
            }
            followers_list.append(list_element)
        return jsonify(followers=followers_list), 200
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/user/get_following/<username>", methods=['GET'])
def get_user_following(username):
    try:
        user = db.session.query(User).filter_by(username=username).first()
        following_list = []
        for followed in user.following:
            list_element = {
                'username': followed.username,
                'first_name': followed.first_name,
                'last_name': followed.last_name,
                'profile_picture': followed.profile_picture
            }
            following_list.append(list_element)
        return jsonify(following=following_list), 200
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/user/get_followers/<username>", methods=['GET'])
def get_user_followers(username):
    try:
        user = db.session.query(User).filter_by(username=username).first()
        followers_list = []
        for follower in user.followers:
            list_element = {
                'username': follower.username,
                'first_name': follower.first_name,
                'last_name': follower.last_name,
                'profile_picture': follower.profile_picture
            }
            followers_list.append(list_element)
        return jsonify(followers=followers_list), 200
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/send_notification", methods=['POST'])
@jwt_required()
def send_notification():
    try:
        data = request.get_json()
        content = data['content']
        timestamp = datetime.datetime.now()

        new_notification = Notification(
            content=content,
            username=current_user.username,
            timestamp=timestamp
        )
        db.session.add(new_notification)
        db.session.commit()
        return jsonify(message="Successfully sent notification"), 200
    except Exception as e:
        return jsonify(message=str(e)), 400

@app.route("/get_notifications", methods=['GET'])
@jwt_required()
def get_notifications():
    try:
        notifications_list = []
        ordered_notifications = db.session.query(Notification).filter_by(username=current_user.username).order_by(Notification.timestamp.desc()).all()
        for notification in ordered_notifications:
            list_element = {
                'notification_id': notification.notification_id,
                'username': notification.username,
                'timestamp': notification.timestamp,
                'content': notification.content
            }
            notifications_list.append(list_element)
        return jsonify(notifications=notifications_list), 200
    except Exception as e:
        return jsonify(message=str(e)), 400


if __name__ == "__main__":
    app.run(debug = True)