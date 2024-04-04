from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

follow = db.Table(
    'follow',
    db.Column("following_username", db.Integer, db.ForeignKey("users.username")),
    db.Column("follower_username", db.Integer, db.ForeignKey("users.username"))
)

class User(db.Model):
    __tablename__ = "users"
    # id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    username = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    bio = db.Column(db.Text)
    dob = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    profile_picture = db.Column(db.String(1000), nullable=False, server_default="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=")
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    account_private = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    posts = relationship("Post", back_populates="user", cascade="all, delete")
    comments = relationship("Comment", back_populates="user", cascade="all, delete")
    likes = relationship("Like", back_populates="user", cascade="all, delete")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete")
    # sent_messages = relationship("Message", back_populates="sender", cascade="all, delete")
    # received_messages = relationship("Message", back_populates="receiver", cascade="all, delete")

    followers = db.relationship(
        'User',
        secondary = follow,
        primaryjoin = (follow.c.following_username == username),
        secondaryjoin = (follow.c.follower_username == username),
        backref = 'following',
        cascade = "all, delete"
    )

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

    comments = relationship("Comment", back_populates="post", cascade="all, delete")
    likes = relationship("Like", back_populates="post", cascade="all, delete")

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

class Notification(db.Model):
    __tablename__ = "notifications"
    notification_id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    username = db.Column(db.String(32), db.ForeignKey('users.username'), nullable=False)
    user = relationship("User", lazy="subquery", back_populates="notifications")
    timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
    content = db.Column(db.Text)

    def __repr__(self):
        return f"Notification ('{self.notification_id}', '{self}"

# class Message(db.Model):
#     __tablename__ = "messages"
#     message_id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
#     timestamp = db.Column(db.DateTime, server_default=db.func.now())
#     content = db.Column(db.Text, nullable=False)
#     sender_username = db.Column(db.String(32), db.ForeignKey('users.username'), nullable=False)
#     sender = relationship("User", lazy="subquery", back_populates="sent_messages")
#     receiver_username = db.Column(db.String(32), db.ForeignKey('users.username'), nullable=True)
#     receiver = relationship("User", lazy="subquery", back_populates="received_messages")
#
#     def __repr__(self):
#         return f"Message ('{self.message_id}', '{self}"


