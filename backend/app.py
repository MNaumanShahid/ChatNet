from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Flask, request, redirect, url_for, abort, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from flask_cors import CORS
from models import db, User, Post, Comment, Like
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

#
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

@app.route("/delete_user", methods=['POST'])
# @jwt_required()
def delete_user():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        with app.app_context():
            user = db.session.query(User).filter_by(username=username).first()
            if user:
                if check_password_hash(user.password, password):
                    db.session.delete(user)
                    db.session.commit()
                    response = jsonify(message="Deleted successfully")
                    return response, 200
                else:
                    raise Exception("Incorrect password.")
            else:
                raise Exception("User not found")
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
            timestamp=data.get('timestamp')
        )
        with app.app_context():
            db.session.add(new_post)
            db.session.commit()
        return jsonify(mesage="Post created successfully"), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/update_post/<post_id: int>", methods=['POST'])
@jwt_required()
def update_post(post_id):
    try:
        with app.app_context():
            post = db.session.query(Post).filter_by(post_id=post_id)
            if post:
                if current_user.usernmae == post.username:
                    data = request.get_json()
                    post.username=current_user.username,
                    post.post_text=data.get('post_text'),
                    post.image=data.get('image'),
                    post.location=data.get('location'),
                    post.timestamp=data.get('timestamp')
                    db.session.commit()
                    return jsonify(message="Post updated successfully"), 200
                else:
                    raise Exception("Unauthorized user.")
            else:
                raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route("/delete_post/<post_id: int>", methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    try:
        with app.app_context():
            post = db.session.query(Post).filter_by(post_id=post_id).first()
            if post:
                if current_user.usernmae == post.username:
                    db.session.delete(post)
                    db.session.commit()
                    return jsonify(message="Post deleted successfully"), 200
                else:
                    raise Exception("Unauthorized user.")
            else:
                raise Exception("Post not found.")
    except Exception as e:
        return jsonify({'message': str(e)}), 400

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



if __name__ == "__main__":
    app.run(debug = True)