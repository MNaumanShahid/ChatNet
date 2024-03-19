from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    # id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    username = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    bio = db.Column(db.Text)
    dob = db.Column(db.DateTime, nullable=False)
    profile_picture = db.Column(db.String(1000))
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    account_private = db.Column(db.Boolean, default=False)

    posts = relationship("Post", back_populates="user", cascade="all, delete")
    comments = relationship("Comment", back_populates="user", cascade="all, delete")
    likes = relationship("Like", back_populates="user", cascade="all, delete")

    def __repr__(self):
        return f"User ('{self.id}', '{self.username}', '{self}"


class Post(db.Model):
    __tablename__ = "posts"
    post_id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    username = db.Column(db.String(32), db.ForeignKey('users.username'), nullable=False)
    user = relationship("User", lazy="subquery", back_populates="posts")
    post_text = db.Column(db.Text)
    image = db.Column(db.String(1000))
    location = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime)

    comments = relationship("Comment", back_populates="post")
    likes = relationship("Like", back_populates="post")

    def __repr__(self):
        return f"Post ('{self.post_id}', '{self}"


class Comment(db.Model):
    __tablename__ = "comments"
    comment_id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    post_id = db.Column(db.String(32), db.ForeignKey('posts.post_id'), nullable=False)
    post = db.relationship("Post", lazy="subquery", back_populates="comments")
    username = db.Column(db.String(32), db.ForeignKey('users.username'), nullable=False)
    user = relationship("User", lazy="subquery", back_populates="comments")
    timestamp = db.Column(db.DateTime)
    content = db.Column(db.Text)

    def __repr__(self):
        return f"Comment ('{self.comment_id}', '{self}"


class Like(db.Model):
    __tablename__ = "likes"
    like_id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    post_id = db.Column(db.String(32), db.ForeignKey('posts.post_id'))
    post = relationship("Post", lazy="subquery", back_populates="likes")
    username = db.Column(db.String(32), db.ForeignKey('users.username'), nullable=False)
    user = relationship("User", lazy="subquery", back_populates="likes")

    timestamp = db.Column(db.DateTime)

    def __repr__(self):
        return f"Like ('{self.like_id}', '{self}"




