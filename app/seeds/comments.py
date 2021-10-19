from app.models import db, Comment

def seed_comments():
    seed1 = Comment(
        user_id=2,
        duck_id=1,
        content="Wow this is the most beautiful duck I've ever seen!"
    )

    db.session.add(seed1)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
