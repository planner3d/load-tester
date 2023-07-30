import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpansionPanelComponent} from "../../shared/expansion-panel/expansion-panel.component";
import {SceneryListComponent} from "../test-plan/features/scenery-list/scenery-list.component";
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";

export interface HttpSamplerRequest {
  method: string;
  url: string;
}

export interface HttpHeader {
  domain: string;
  method: string;
  endpoint: string;
}

export interface HttpSampler {
  httpHeader: HttpHeader;
  requestBody?: HttpSamplerRequest;
}

export interface SelectedScenery {
  sceneryHeader: string;
  samplerList: HttpSampler[];
}

@Component({
  selector: 'app-selected-scenery',
  standalone: true,
  imports: [CommonModule, SceneryListComponent, ExpansionPanelComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule],
  templateUrl: './selected-scenery.component.html',
  styleUrls: ['./selected-scenery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedSceneryComponent {
  protected selectedScenery: SelectedScenery = {
    sceneryHeader: 'Тестовый сценарий 1',
    samplerList: [
      {
        httpHeader: {
          domain: 'www.google.com',
          method: 'GET',
          endpoint: '/'
        },
      },
      {
        httpHeader: {
          domain: 'www.yandex.ru',
          method: 'POST',
          endpoint: '/api/music'
        },
      },
      {
        httpHeader: {
          domain: 'www.amazon.com',
          method: 'PUT',
          endpoint: '/remove'
        },
      },
      {
        httpHeader: {
          domain: 'www.kahoot.com',
          method: 'GET',
          endpoint: '/'
        },
      }
    ],
  }
}
