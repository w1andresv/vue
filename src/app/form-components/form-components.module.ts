import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { NgxCurrencyModule } from 'ngx-currency';
import { UpperCaseReactiveDirective } from '../helpers/UperCaseText';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { EditorModule } from 'primeng/editor';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';


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
    DropdownModule,
    CalendarModule,
    FieldsetModule,
    CheckboxModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    PanelModule,
    RadioButtonModule,
    SpinnerModule,
    EditorModule,
    TableModule,
    InputTextModule,
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
    DropdownModule,
    CalendarModule,
    FieldsetModule,
    CheckboxModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    PanelModule,
    RadioButtonModule,
    SpinnerModule,
    EditorModule,
    TableModule,
    KeyFilterModule,
    InputTextModule,
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
