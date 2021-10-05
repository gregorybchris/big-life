from entity import Entity


class Library:
    GLIDER = Entity(cells=[(-1, -1), (-1, 0), (-1, 1), (0, 1), (1, 0)])

    GLIDER_INTERMEDIATE = Entity(cells=[(-1, 0), (0, 0), (0, 1), (1, 1), (1, -1)])

    R_PENTOMINO = Entity(cells=[(1, 0), (0, 0), (0, -1), (-1, 0), (-1, 1)])

    T_TETROMINO = Entity(cells=[(1, 0), (0, 0), (0, -1), (0, 1)])

    GLIDER_GUN = Entity(entities=[
        GLIDER.transform(row=3, col=0, rotate=-1),  # shuttle 1 glider
        GLIDER_INTERMEDIATE.transform(row=2, col=-6, flip=True),  # shuttle 1 ship glider
        GLIDER.transform(row=1, col=-11, rotate=-1),  # shuttle 1 ship pond glider 2
        GLIDER_INTERMEDIATE.transform(row=-3, col=-12, rotate=2),  # shuttle 1 ship pond glider 1

        GLIDER.transform(row=-1, col=-18, flip=True),  # block 1 glider 2
        GLIDER.transform(row=-5, col=-20, flip=True, rotate=-1),  # block 1 glider 1

        GLIDER.transform(row=6, col=19, rotate=-1),  # shuttle 2 glider
        GLIDER_INTERMEDIATE.transform(row=0, col=8, flip=True),  # shuttle 2 ship glider
        GLIDER.transform(row=-1, col=3, rotate=-1),  # shuttle 2 ship pond glider 2
        GLIDER_INTERMEDIATE.transform(row=-5, col=2, rotate=2),  # shuttle 2 ship pond glider 1

        GLIDER.transform(row=-3, col=16, flip=True),  # block 2 glider 2
        GLIDER.transform(row=-7, col=14, flip=True, rotate=-1),  # block 2 glider 1

        GLIDER.transform(row=11, col=8, flip=True),  # shuttle 1 beehive annihilator glider
    ])
