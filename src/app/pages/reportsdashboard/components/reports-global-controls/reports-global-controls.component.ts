import {
  Component, ElementRef, Input, OnInit, OnDestroy, AfterViewInit, EventEmitter, Output, ViewChild,
} from '@angular/core';
import {
  Router, NavigationEnd, NavigationCancel, ActivatedRoute, ActivatedRouteSnapshot,
} from '@angular/router';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import * as _ from 'lodash';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { FieldSet } from 'app/pages/common/entity/entity-form/models/fieldset.interface';
import { FormConfig } from 'app/pages/common/entity/entity-form/entity-form-embedded.component';
import { FieldConfig } from 'app/pages/common/entity/entity-form/models/field-config.interface';
import { CommonDirectivesModule } from 'app/directives/common/common-directives.module';
import { GlobalAction } from 'app/components/common/pagetitle/pagetitle.component';

import { ErdService } from 'app/services/erd.service';
import { TranslateService } from '@ngx-translate/core';
import { T } from '../../../../translate-marker';

@Component({
  selector: 'reports-global-controls',
  templateUrl: './reports-global-controls.component.html',
})
export class ReportsGlobalControlsComponent implements GlobalAction {
  config: any; // Reports page

  applyConfig(conf: any): void {
    this.config = conf;
  }
}
