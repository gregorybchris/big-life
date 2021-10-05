from library import Library
from world import World


if __name__ == '__main__':
    bounds = -15, 15, -25, 25
    world = World()

    # world.add_entity(Library.GLIDER)
    # world.add_entity(Library.T_TETROMINO)
    # world.add_entity(Library.R_PENTOMINO)
    world.add_entity(Library.GLIDER_GUN)

    n_ticks = 80
    for i in range(n_ticks):
        world.print(bounds=bounds)
        print()
        world = world.tick()
