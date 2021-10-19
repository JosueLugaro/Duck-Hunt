from app.models import db, Duck


def seed_ducks():
    seed1 = Duck(
        user_id=1,
        name="Awesome duck",
        image="https://pyxis.nymag.com/v1/imgs/a9e/265/89a838cbef7800893d235460f417db7cd4-29-mandarin-duck.rsquare.w700.jpg",
        description="Insanely Beautiful duck, obvi"
    )

    db.session.add(seed1)
    db.session.commit()


def undo_ducks():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
