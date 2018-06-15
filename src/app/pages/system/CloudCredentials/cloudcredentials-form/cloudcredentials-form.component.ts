import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as _ from 'lodash';
import { WebSocketService, CloudCredentialService } from '../../../../services/';
import { FieldConfig } from '../../../common/entity/entity-form/models/field-config.interface';
import { T } from '../../../../translate-marker';

@Component({
  selector: 'app-cloudcredentials-form',
  template: `<entity-form [conf]="this"></entity-form>`,
  providers: [ CloudCredentialService ],
})
export class CloudCredentialsFormComponent {

  protected isEntity = true;
  protected addCall = 'backup.credential.create';
  protected queryCall = 'backup.credential.query';
  protected queryCallOption: Array<any> = [['id', '=']];
  protected route_success: string[] = ['system', 'cloudcredentials'];
  protected formGroup: FormGroup;
  protected id: any;
  protected pk: any;

  protected selectedProvider: string = 'AMAZON_CLOUD_DRIVE';

  protected fieldConfig: FieldConfig[] = [
    {
      type: 'input',
      name: 'name',
      placeholder: T('Name'),
      tooltip: T('Enter a name for the new credential.'),
      required: true,
      validation: [Validators.required],
    },
    {
      type: 'select',
      name: 'provider',
      placeholder: T('Provider'),
      options: [],
      value: 'AMAZON_CLOUD_DRIVE',
      required: true,
      validation: [Validators.required],
    },
    // Amazon_cloud_drive
    {
      type: 'input',
      name: 'client_id',
      placeholder: T('Amazon Application Client ID'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'AMAZON_CLOUD_DRIVE',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'client_secret',
      placeholder: T('Application Key'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'AMAZON_CLOUD_DRIVE',
           }]
        }
      ]
    },
    // Amazon_s3
    {
      type: 'input',
      name: 'access_key_id',
      placeholder: T('Access Key ID'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'S3',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'secret_access_key',
      placeholder: T('Secret Access Key'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'S3',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'endpoint',
      placeholder: T('Endpoint URL'),
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'S3',
           }]
        }
      ]
    },
    // backblaze b2
    {
      type: 'input',
      name: 'account-B2',
      placeholder: T('Account ID'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'B2',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'key-B2',
      placeholder: T('Application Key'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'B2',
           }]
        }
      ]
    },
    // box
    {
      type: 'input',
      name: 'token-BOX',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'BOX',
           }]
        }
      ]
    },
    // dropbox
    {
      type: 'input',
      name: 'token-DROPBOX',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'DROPBOX',
           }]
        }
      ]
    },
    // ftp
    {
      type: 'input',
      name: 'host-FTP',
      placeholder: T('Host'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'FTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'port-FTP',
      placeholder: T('Port'),
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'FTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'user-FTP',
      placeholder: T('Username'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'FTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'pass-FTP',
      placeholder: T('Password'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'FTP',
           }]
        }
      ]
    },
    // google cloud storage
    {
      type: 'input',
      name: 'service_account_credentials',
      placeholder: T('Service Account'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'GOOGLE_CLOUD_STORAGE',
           }]
        }
      ]
    },
    // google drive
    {
      type: 'input',
      name: 'token-GOOGLE_DRIVE',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'GOOGLE_DRIVE',
           }]
        }
      ]
    },
    // http
    {
      type: 'input',
      name: 'url-HTTP',
      placeholder: T('URL'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'HTTP',
           }]
        }
      ]
    },
    // hubic
    {
      type: 'input',
      name: 'token-HUBIC',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'HUBIC',
           }]
        }
      ]
    },
    // mega
    {
      type: 'input',
      name: 'user-MEGA',
      placeholder: T('Username'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'MEGA',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'pass-MEGA',
      placeholder: T('Password'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'MEGA',
           }]
        }
      ]
    },
    // microsoft azure
    {
      type: 'input',
      name: 'account-AZUREBLOB',
      placeholder: T('Account Name'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'AZUREBLOB',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'key-AZUREBLOB',
      placeholder: T('Account Key'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'AZUREBLOB',
           }]
        }
      ]
    },
    // microsoft onedrive
    {
      type: 'input',
      name: 'token-ONEDRIVE',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'ONEDRIVE',
           }]
        }
      ]
    },
    // pcloud
    {
      type: 'input',
      name: 'token-PCLOUD',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'PCLOUD',
           }]
        }
      ]
    },
    // sftp
    {
      type: 'input',
      name: 'host-SFTP',
      placeholder: T('Host'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'SFTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'port-SFTP',
      placeholder: T('Port'),
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'SFTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'user-SFTP',
      placeholder: T('Username'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'SFTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'pass-SFTP',
      placeholder: T('Password'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'SFTP',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'key_file',
      placeholder: T('PEM-encoded private key file path'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'SFTP',
           }]
        }
      ]
    },
    // webdav
    {
      type: 'input',
      name: 'url-WEBDAV',
      placeholder: T('URL'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'WEBDAV',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'vendor',
      placeholder: T('Name of the WebDAV site/service/software'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'WEBDAV',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'user-WEBDAV',
      placeholder: T('Username'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'WEBDAV',
           }]
        }
      ]
    },
    {
      type: 'input',
      name: 'pass-WEBDAV',
      placeholder: T('Password'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'WEBDAV',
           }]
        }
      ]
    },
    // yandex
    {
      type: 'input',
      name: 'token-YANDEX',
      placeholder: T('Access Token'),
      required: true,
      isHidden: true,
      relation: [
        {
          action: 'SHOW',
          when: [{
            name: 'provider',
            value: 'YANDEX',
           }]
        }
      ]
    },
  ];


  protected providers: Array<any>;
  protected providerField: any;

  constructor(protected router: Router,
              protected aroute: ActivatedRoute,
              protected ws: WebSocketService,
              protected cloudcredentialService: CloudCredentialService) {
    this.providerField = _.find(this.fieldConfig, {'name': 'provider'});
    this.cloudcredentialService.getProviders().subscribe(
      (res) => {
        this.providers = res;
        console.log(this.providers);
        for (let i in res) {
          this.providerField.options.push(
            {
              label: res[i].title,
              value: res[i].name,
            }
          );
        }
      }
    );
  }

  preInit() {
    this.aroute.params.subscribe(params => {
      if (params['pk']) {
        this.queryCallOption[0].push(params['pk']);
        this.id = params['pk'];
      }
    });
  }

  afterInit(entityForm: any) {
    console.log(entityForm);
    entityForm.submitFunction = this.submitFunction;

    entityForm.formGroup.controls['provider'].valueChanges.subscribe((res) => {
      this.selectedProvider = res;
   
    });
  }

  hideField(fieldName: any, show: boolean, entity: any) {
    let target = _.find(this.fieldConfig, {'name' : fieldName});
    target.isHidden = show;
    entity.setDisabled(fieldName, show);
  }

  submitFunction() {
    const attributes = {};
    const value = _.cloneDeep(this.formGroup.value);
    for (let item in value) {
      if (item != 'name' && item != 'provider') {
        if (item == 'keyfile') {
          attributes[item] =  JSON.parse(value[item]);
        } else if (item != 'preview') {
          attributes[item] = value[item];
        }
        delete value[item];
      }
    }
    value['attributes'] = attributes;
    if (!this.pk) {
      return this.ws.call('backup.credential.create', [value]);
    } else {
      return this.ws.call('backup.credential.update', [this.pk, value]);
    }
  }

  dataAttributeHandler(entityForm: any) {
    for (let i in entityForm.wsResponseIdx) {
      if (typeof entityForm.wsResponseIdx[i] === 'object') {
        entityForm.wsResponseIdx[i] = JSON.stringify(entityForm.wsResponseIdx[i]);
      }
      entityForm.formGroup.controls[i].setValue(entityForm.wsResponseIdx[i]);
    }
  }
}
