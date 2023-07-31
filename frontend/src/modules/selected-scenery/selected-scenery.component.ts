import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SceneryListComponent} from "../test-plan/features/scenery-list/scenery-list.component";
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";
import {HTTP_METHODS, HttpSampler} from "./types/http-sampler";

export interface SelectedScenery {
  sceneryHeader: string;
  samplerList: HttpSampler[];
}

@Component({
  selector: 'app-selected-scenery',
  standalone: true,
  imports: [CommonModule, SceneryListComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule],
  templateUrl: './selected-scenery.component.html',
  styleUrls: ['./selected-scenery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedSceneryComponent {
  protected selectedScenery: SelectedScenery = {
    sceneryHeader: 'Тестовый сценарий 1',
    samplerList: [
      {
        domain: 'www.google.com',
        method: HTTP_METHODS.Get,
        endpoint: '/',
      },
      {
        domain: 'www.yandex.ru',
        method: HTTP_METHODS.Post,
        endpoint: '/api/music'
      },
      {
        domain: 'www.amazon.com',
        method: HTTP_METHODS.Put,
        endpoint: '/remove'
      },
      {
        domain: 'www.kahoot.com',
        method: HTTP_METHODS.Get,
        endpoint: '/'
      }
    ],
  }
}
