import sys

from typing import Generator, Optional, Tuple

from entity import Entity


class World:
    def __init__(self):
        self._cells = {}

    def set(self, row: int, col: int, alive: bool = True) -> None:
        if alive:
            if row not in self._cells:
                self._cells[row] = {}
            self._cells[row][col] = alive
        else:
            if row in self._cells:
                if col in self._cells[row]:
                    del self._cells[row][col]
                if len(self._cells[row]) == 0:
                    del self._cells[row]

    def get(self, row: int, col: int) -> bool:
        if row not in self._cells:
            return False
        if col not in self._cells[row]:
            return False
        return self._cells[row][col]

    def iterator(
        self,
        alive: Optional[bool] = None,
    ) -> Generator[Tuple[int, int], None, None]:
        for row, row_cells in self._cells.items():
            for col, state in row_cells.items():
                if alive is not None and state != alive:
                    continue
                yield (row, col)

    def _get_bounds(
        self,
    ) -> Tuple[int, int, int, int]:
        row_min = col_min = sys.maxsize
        row_max = col_max = -sys.maxsize
        for row, col in self.iterator(alive=True):
            row_min = min(row, row_min)
            row_max = max(row, row_max)
            col_min = min(col, col_min)
            col_max = max(col, col_max)
        return row_min, row_max, col_min, col_max

    def print(
        self,
        bounds: Optional[Tuple[int, int, int, int]] = None
    ) -> None:
        if bounds is None:
            row_min, row_max, col_min, col_max = self._get_bounds()
        else:
            row_min, row_max, col_min, col_max = bounds
        n_rows = row_max - row_min + 1
        n_cols = col_max - col_min + 1

        dense_world = [[' ' for _ in range(n_cols)] for _ in range(n_rows)]
        for row, col in self.iterator(alive=True):
            if row >= row_min and row <= row_max and col >= col_min and col <= col_max:
                dense_world[row - row_min][col - col_min] = '@'

        for dense_row in dense_world:
            print(f"|{' '.join(dense_row)}|")

    def tick(self) -> "World":
        new_world = World()
        visited_world = World()
        for row, col in self.iterator(alive=True):
            self._update_cell(row, col, new_world, visited_world)
            for r, c in self._get_neighbors(row, col):
                self._update_cell(r, c, new_world, visited_world)
        return new_world

    @classmethod
    def _get_neighbors(cls, row: int, col: int) -> Generator[Tuple[int, int], None, None]:
        for r in range(row - 1, row + 2):
            for c in range(col - 1, col + 2):
                if r != row or c != col:
                    yield r, c

    @classmethod
    def _count_neighbors(cls, row: int, col: int, world: "World") -> int:
        n_neighbors = 0
        for r, c in cls._get_neighbors(row, col):
            if world.get(r, c):
                n_neighbors += 1
        return n_neighbors

    def _update_cell(self, row: int, col: int, new_world: "World", visited_world: "World") -> None:
        if visited_world.get(row, col):
            return
        visited_world.set(row, col)
        n_neighbors = self._count_neighbors(row, col, self)
        if n_neighbors < 2:
            pass
        elif n_neighbors == 2:
            new_world.set(row, col, self.get(row, col))
        elif n_neighbors == 3:
            new_world.set(row, col, True)
        elif n_neighbors > 3:
            pass

    def add_entity(self, entity: Entity) -> None:
        for r, c in entity.iterator():
            self.set(r, c)
