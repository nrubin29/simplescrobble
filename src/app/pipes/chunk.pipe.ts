import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform<T>(arr: T[], length: number): T[][] {
    if (length === 0) {
      return [arr];
    }

    const chunks = [];
    let i = 0;

    while (i < arr.length) {
      chunks.push(arr.slice(i, i += length));
    }

    return chunks;
  }
}
