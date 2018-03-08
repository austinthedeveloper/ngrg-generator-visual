import * as fromMaterial from '@angular/material';

import { NgModule } from '@angular/core';

const MaterialArray = [
  fromMaterial.MatButtonModule, fromMaterial.MatFormFieldModule,
  fromMaterial.MatSelectModule, fromMaterial.MatInputModule,
  fromMaterial.MatCheckboxModule, fromMaterial.MatCardModule
];
@NgModule({
  imports: MaterialArray,
  exports: MaterialArray,
})
export class MaterialsModule {}
