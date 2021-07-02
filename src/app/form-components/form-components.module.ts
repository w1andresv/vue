import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { NgxCurrencyModule } from 'ngx-currency';
import { UpperCaseReactiveDirective } from '../_helpers/UperCaseText';
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
import { AlphabeticReactiveDirective } from '../_helpers/alphabetic-reactive.directive';
import { NumberReactiveDirective } from '../_helpers/number-reactive.directive';
import { CapitalizeReactiveDirective } from '../_helpers/capitalize-reactive.directive';
import { CodigosReactiveDirective } from '../_helpers/codigos-reactive.directive';
import { DineroPipe } from '../_pipes/dinero.pipe';
import { NumeroPipe } from '../_pipes/numero.pipe';
import { TelefonoPipe } from '../_pipes/telefono.pipe';
import { MonedaDirective } from '../_helpers/moneda.directive';
import { NumeroDecimalRangoReactiveDirective } from '../_helpers/numero-decimal-rango-reactive.directive';
import { NumeroDecimalReactiveDirective } from '../_helpers/numero-decimal-reactive.directive';
import { PorcentajeReactiveDirective } from '../_helpers/porcentaje-reactive.directive';
import { SinCaracteresEspecialesReactiveDirective } from '../_helpers/sin-caracteres-especiales-reactive.directive';
import { SinNumerosReactiveDirective } from '../_helpers/sin-numeros-reactive.directive';
import { TextoReactiveDirective } from '../_helpers/texto-reactive.directive';
import { Splitter } from 'primeng/splitter';
import { SplitButtonModule } from 'primeng/splitbutton';


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
    TooltipModule,
    SplitButtonModule
  ],
  declarations: [
    UpperCaseReactiveDirective,
    AlphabeticReactiveDirective,
    NumberReactiveDirective,
    CapitalizeReactiveDirective,
    CodigosReactiveDirective,
    NumeroDecimalRangoReactiveDirective,
    NumeroDecimalReactiveDirective,
    PorcentajeReactiveDirective,
    SinCaracteresEspecialesReactiveDirective,
    SinNumerosReactiveDirective,
    TextoReactiveDirective,
    DineroPipe,
    NumeroPipe,
    MonedaDirective,
    TelefonoPipe,


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
    AlphabeticReactiveDirective,
    NumberReactiveDirective,
    MonedaDirective,
    NumeroDecimalRangoReactiveDirective,
    NumeroDecimalReactiveDirective,
    PorcentajeReactiveDirective,
    SinCaracteresEspecialesReactiveDirective,
    SinNumerosReactiveDirective,
    TextoReactiveDirective,
    TooltipModule,
    SplitButtonModule
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
