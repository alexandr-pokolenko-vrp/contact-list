import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from './input-base';

@Injectable()
export class InputControlService {
  constructor() { }

  toFormGroup(inputs: InputBase<any>[], bypassRequired = false): FormGroup {
    const group: any = {};

    inputs.forEach(input => {
      // Don't include relationship fields into form
      // TODO: revise this limitation and include relationship fields
      if (!input.key.includes('.')) {
        group[input.key] = !bypassRequired && input.required
        ? new FormControl(input.value || '', Validators.required) // add validator
        : new FormControl(input.value || '');
      }
    });

    return new FormGroup(group);
  }
}