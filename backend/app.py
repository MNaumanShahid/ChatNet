from flask import Flask, request, redirect, url_for, abort, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Relationship
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from functools import wraps
from flask_gravatar import Gravatar
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = "845jdbvjdb8422kds**jbsdfjds"

gravatar = Gravatar(
    app,
    rating='g',
    default='retro',
    force_default=False,
    force_lower=False,
    use_ssl=False,
    base_url=None
)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    with app.app_context():
        user = User.query.get(int(user_id))
    return user

# Connect to DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chatnet.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configure tables
class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)

#
# with app.app_context():
#     db.create_all()


@app.route('/')
def home():
    return redirect(url_for('signup'))

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('firstname')
        last_name = data.get('lastname')

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
            password = hashed_pwd
        )
        with app.app_context():
            db.session.add(new_user)
            db.session.commit()
            # login_user(new_user)

        return jsonify({'message': 'Successfully signed up.'}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500



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
                    # login_user(user)
                    return jsonify({'message': 'Successfully logged in.'}), 200
                else:
                    raise Exception("Incorrect password.")
            else:
                raise Exception("Username not found.")

    except Exception as e:
        return jsonify({'message': str(e)}), 500


if __name__ == "__main__":
    app.run(debug = True)