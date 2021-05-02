import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccordionModule,
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  ChartModule,
  CheckboxModule,
  ColorPickerModule,
  ConfirmDialogModule,
  DataListModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  FileUploadModule,
  GrowlModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  KeyFilterModule,
  ListboxModule,
  MessageModule,
  MessagesModule,
  MultiSelectModule,
  OrderListModule,
  PanelModule,
  PickListModule,
  RadioButtonModule,
  ScrollPanelModule,
  SelectButtonModule,
  SliderModule,
  SpinnerModule,
  TabViewModule,
  ToggleButtonModule,
  TooltipModule,
  TreeModule
} from 'primeng/primeng';

import { TableModule } from 'primeng/table';
import { NgxCurrencyModule } from 'ngx-currency';
import { UpperCaseReactiveDirective } from '../helpers/UperCaseText';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule( {
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    TabViewModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule,
    FileUploadModule,
    DropdownModule,
    CalendarModule,
    GrowlModule,
    TreeModule,
    FieldsetModule,
    CheckboxModule,
    ToggleButtonModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    PanelModule,
    SliderModule,
    SliderModule,
    RadioButtonModule,
    PickListModule,
    DataListModule,
    OrderListModule,
    ChartModule,
    MultiSelectModule,
    ListboxModule,
    SpinnerModule,
    ColorPickerModule,
    EditorModule,
    TableModule,
    InputTextModule,
    ScrollPanelModule,
    KeyFilterModule,
    NgxCurrencyModule,
    CardModule,
    TooltipModule
  ],
  declarations: [
    UpperCaseReactiveDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    TabViewModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule,
    FileUploadModule,
    DropdownModule,
    CalendarModule,
    GrowlModule,
    TreeModule,
    FieldsetModule,
    CheckboxModule,
    ToggleButtonModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    PanelModule,
    SliderModule,
    SelectButtonModule,
    RadioButtonModule,
    PickListModule,
    DataListModule,
    OrderListModule,
    ChartModule,
    MultiSelectModule,
    ListboxModule,
    SpinnerModule,
    ColorPickerModule,
    EditorModule,
    TableModule,
    KeyFilterModule,
    InputTextModule,
    ScrollPanelModule,
    NgxCurrencyModule,
    CardModule,
    UpperCaseReactiveDirective,
    TooltipModule
  ]
} )
export class FormSharedModule {
  static forRoot(): ModuleWithProviders<FormSharedModule> {
    return {
      ngModule: FormSharedModule,
      providers: []
    };
  }
}
