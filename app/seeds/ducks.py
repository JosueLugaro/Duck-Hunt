from app.models import db, Duck


def seed_ducks():
    seed1 = Duck(
        user_id=1,
        name="Awesome duck",
        image="https://pyxis.nymag.com/v1/imgs/a9e/265/89a838cbef7800893d235460f417db7cd4-29-mandarin-duck.rsquare.w700.jpg",
        description="Insanely Beautiful duck, obvi"
    )

    seed2 = Duck(
        user_id=2,
        name="Awesome duck",
        image="https://picsum.photos/200/300",
        description="Insanely Beautiful duck, obvi"
    )

    seed3 = Duck(
        user_id=2,
        name="Awesome duck",
        image="https://picsum.photos/200",
        description="Insanely Beautiful duck, obvi"
    )

    seed4 = Duck(
        user_id=2,
        name="Awesome duck",
        image="https://picsum.photos/300/200",
        description="Insanely Beautiful duck, obvi"
    )

    seed5 = Duck(
        user_id=2,
        name="Awesome duck",
        image="https://picsum.photos/300",
        description="Insanely Beautiful duck, obvi"
    )

    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)
    db.session.add(seed4)
    db.session.add(seed5)
    db.session.commit()


def undo_ducks():
    db.session.execute('TRUNCATE ducks RESTART IDENTITY CASCADE;')
    db.session.commit()
