import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';
@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes() {
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes').pipe(
      tap((valor) => console.log(valor)),
      pluck('payload'),
      map((acoes) =>
        acoes.sort((acaoA: Acao, acaoB: Acao) =>
          this.ordenaPorCodigo(acaoA, acaoB)
        )
      )
    );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA > acaoB) {
      return 1;
    }
    if (acaoB > acaoA) {
      return -1;
    }
    return 0;
  }
}
