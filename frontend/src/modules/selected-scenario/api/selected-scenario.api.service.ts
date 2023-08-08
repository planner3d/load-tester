import {Injectable} from '@angular/core';
import {SelectedScenario} from "../data-access/selected-scenario.data.service";
import {first, Observable, of} from "rxjs";
import {HTTP_METHODS} from "../types/http-sampler";
import {SAMPLER_TYPES} from "../types/sampler";

@Injectable()
export class SelectedScenarioApiService {

  private serverData: SelectedScenario[] = [
    {
      guid: 'fjdjhf743747dh',
      name: 'Тестовый сценарий 1',
      samplerList: [
        {
          guid: '5454kfdjsdssd',
          domain: 'www.google.com',
          method: HTTP_METHODS.Get,
          type: SAMPLER_TYPES.Http,
          endpoint: '/',
        },
        {
          guid: 'dsd43454dsds',
          domain: 'www.yandex.ru',
          method: HTTP_METHODS.Post,
          type: SAMPLER_TYPES.Http,
          endpoint: '/api/music'
        },
        {
          guid: 'rfdf44534343',
          destination: 'go/this/url',
          type: SAMPLER_TYPES.Ftp,
        },
        {
          guid: 'dsdsdxhy6666674',
          domain: 'www.kahoot.com',
          method: HTTP_METHODS.Get,
          type: SAMPLER_TYPES.Http,
          endpoint: '/'
        }
      ],
    },
    {
      guid: '3434fdsddsdh',
      name: 'Тестовый сценарий 2',
      samplerList: [
        {
          guid: '5454kfdjsdssd',
          domain: 'www.babam.com',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Get,
          endpoint: '/',
        },
        {
          guid: 'dsd43454dsds',
          domain: 'www.yandex.kakaha',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Post,
          endpoint: '/api/music'
        },
        {
          guid: 'rfdf44534343',
          domain: 'wewewe.amazon.com',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Put,
          endpoint: '/remove'
        },
        {
          guid: 'dsdsdxhy6666674',
          domain: 'www.eeee.com',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Get,
          endpoint: '/'
        }
      ],
    },
    {
      guid: '9999sjkdjksjdqq',
      name: 'Тестовый сценарий 3',
      samplerList: [
        {
          guid: '5454kfdjsdssd',
          domain: 'www.anatod.com',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Get,
          endpoint: '/',
        },
        {
          guid: 'dsd43454dsds',
          domain: 'vdi.huy.ru',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Post,
          endpoint: '/api/music'
        },
        {
          guid: 'rfdf44534343',
          domain: 'ddd.amazon.com',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Put,
          endpoint: '/remove'
        },
        {
          guid: 'dsdsdxhy6666674',
          domain: 'www.gabar.com',
          type: SAMPLER_TYPES.Http,
          method: HTTP_METHODS.Get,
          endpoint: '/'
        }
      ],
    }
  ]
  constructor() { }

  public getSelectedScenario(guid: SelectedScenario['guid']): Observable<SelectedScenario | undefined> {
    const selectedScenario = this.serverData.find(scenario => scenario.guid === guid);
    return of(selectedScenario).pipe(
        first(),
    );
  }
}
