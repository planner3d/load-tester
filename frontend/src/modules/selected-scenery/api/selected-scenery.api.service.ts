import { Injectable } from '@angular/core';
import {SelectedScenery} from "../data-access/selected-scenery.data.service";
import {first, map, Observable, of} from "rxjs";
import {HTTP_METHODS} from "../types/http-sampler";

@Injectable()
export class SelectedSceneryApiService {

  private serverData: SelectedScenery[] = [
    {
      guid: 'fjdjhf743747dh',
      sceneryHeader: 'Тестовый сценарий 1',
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
      sceneryHeader: 'Тестовый сценарий 1',
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
      sceneryHeader: 'Тестовый сценарий 1',
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

  public getSelectedScenery(guid: SelectedScenery['guid']): Observable<SelectedScenery> {
    const selectedScenery = this.serverData.find(scenery => scenery.guid === guid);
    console.log(selectedScenery)
    return of(selectedScenery).pipe(
        first(),
        map(selectedScenery => {
          if (selectedScenery) return selectedScenery;
          else throw new Error('No such scenery');
        })
    );
  }
}