import math

from typing import Generator, List, Optional, Tuple


class Entity:
    def __init__(
        self,
        cells: Optional[List[Tuple[int, int]]] = None,
        entities: Optional[List["Entity"]] = None,
    ):
        if cells is None and entities is None:
            raise ValueError("Either cells or entities must be passed")

        self._cells = cells
        if cells is None:
            self._cells = []

        if entities is not None:
            for entity in entities:
                for cell in entity.iterator():
                    self._cells.append(cell)

    def iterator(self) -> Generator[Tuple[int, int], None, None]:
        for cell in self._cells:
            yield cell

    def transform(
        self,
        row: int = 0,
        col: int = 0,
        flip: bool = False,
        rotate: int = 0,
    ) -> "Entity":
        """
        1. Flip horizontally
        2. Rotate about the origin clockwise by 90˚
        3. Translate with rows and cols
        """
        cells = []
        for r, c in self._cells:
            # Flip
            if flip:
                c = -c

            # Rotate
            theta = rotate * math.pi / 2
            cos = int(math.cos(theta))
            sin = int(math.sin(theta))
            c, r = cos * c - sin * r, cos * r + sin * c

            # Translate
            r += row
            c += col

            cells.append((r, c))
        return Entity(cells)
