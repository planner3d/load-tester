import { Injectable } from '@angular/core';
import {SelectedScenery} from "../data-access/selected-scenery.data.service";
import {first, Observable, of} from "rxjs";
import {HTTP_METHODS} from "../types/http-sampler";

@Injectable()
export class SelectedSceneryApiService {

  private serverData: SelectedScenery[] = [
    {
      guid: 'fjdjhf743747dh',
      name: 'Тестовый сценарий 1',
      samplerList: [
        {
          guid: '5454kfdjsdssd',
          domain: 'www.google.com',
          method: HTTP_METHODS.Get,
          endpoint: '/',
        },
        {
          guid: 'dsd43454dsds',
          domain: 'www.yandex.ru',
          method: HTTP_METHODS.Post,
          endpoint: '/api/music'
        },
        {
          guid: 'rfdf44534343',
          domain: 'www.amazon.com',
          method: HTTP_METHODS.Put,
          endpoint: '/remove'
        },
        {
          guid: 'dsdsdxhy6666674',
          domain: 'www.kahoot.com',
          method: HTTP_METHODS.Get,
          endpoint: '/'
        }
      ],
    },
    {
      guid: '3434fdsddsdh',
      name: 'Тестовый сценарий 1',
      samplerList: [
        {
          guid: '5454kfdjsdssd',
          domain: 'www.babam.com',
          method: HTTP_METHODS.Get,
          endpoint: '/',
        },
        {
          guid: 'dsd43454dsds',
          domain: 'www.yandex.kakaha',
          method: HTTP_METHODS.Post,
          endpoint: '/api/music'
        },
        {
          guid: 'rfdf44534343',
          domain: 'wewewe.amazon.com',
          method: HTTP_METHODS.Put,
          endpoint: '/remove'
        },
        {
          guid: 'dsdsdxhy6666674',
          domain: 'www.eeee.com',
          method: HTTP_METHODS.Get,
          endpoint: '/'
        }
      ],
    },
    {
      guid: '9999sjkdjksjdqq',
      name: 'Тестовый сценарий 1',
      samplerList: [
        {
          guid: '5454kfdjsdssd',
          domain: 'www.anatod.com',
          method: HTTP_METHODS.Get,
          endpoint: '/',
        },
        {
          guid: 'dsd43454dsds',
          domain: 'vdi.huy.ru',
          method: HTTP_METHODS.Post,
          endpoint: '/api/music'
        },
        {
          guid: 'rfdf44534343',
          domain: 'ddd.amazon.com',
          method: HTTP_METHODS.Put,
          endpoint: '/remove'
        },
        {
          guid: 'dsdsdxhy6666674',
          domain: 'www.gabar.com',
          method: HTTP_METHODS.Get,
          endpoint: '/'
        }
      ],
    }
  ]
  constructor() { }

  public getSelectedScenery(guid: SelectedScenery['guid']): Observable<SelectedScenery | undefined> {
    const selectedScenery = this.serverData.find(scenery => scenery.guid === guid);
    console.log(selectedScenery)
    return of(selectedScenery).pipe(
        first(),
    );
  }
}
