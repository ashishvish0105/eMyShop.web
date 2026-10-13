import {
  Component,
  Input,
  Injector,
  OnInit
} from '@angular/core';

import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { TextEditorComponent } from "../text-editor/text-editor.component";
  import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { CommonModule, LowerCasePipe } from '@angular/common';


@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],

  imports: [
    TextEditorComponent,
    CommonModule,
    FormsModule
  ],
  standalone: true,
})
export class InputGroupComponent
  implements ControlValueAccessor, OnInit {


  // =====================================================
  // INPUTS
  // =====================================================

  @Input()
  labelText = '';


  @Input()
  inputLabelName = '';


  @Input()
  inputPlaceholder = '';


  @Input()
  requiredMessage = '';


  // =====================================================
  // SELECT LIST
  // =====================================================

  private _selectList: any[] = [];


  @Input()
  set selectList(value: any[]) {

    this._selectList =
      value ?? [];


    this.updateSelectedItem();
  }


  get selectList(): any[] {

    return this._selectList;
  }


  // =====================================================
  // VALUE
  // =====================================================

  inputValue: any = '';


  disabled = false;


  // =====================================================
  // SELECT
  // =====================================================

  selectValue: any = null;


  toggleList = false;


  // =====================================================
  // TAGS
  // =====================================================

  tags: string[] = [];


  currentTag = '';


  // =====================================================
  // FORM CONTROL
  // =====================================================

  private ngControl: NgControl | null = null;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private injector: Injector
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    /*
     * IMPORTANT:
     *
     * We get NgControl AFTER the component
     * has been created.
     *
     * This avoids the circular dependency
     * caused by constructor injection.
     */

    this.ngControl =
      this.injector.get(
        NgControl,
        null
      );


    if (this.ngControl) {

      this.ngControl.valueAccessor =
        this;
    }
  }


  // =====================================================
  // CONTROL VALUE ACCESSOR
  // =====================================================

  writeValue(value: any): void {

    // ---------------------------------------------------
    // TAG INPUT
    // ---------------------------------------------------

    if (
      this.inputLabelName ===
      'tagInputGroup'
    ) {

      this.tags =
        Array.isArray(value)
          ? [...value]
          : [];


      return;
    }


    // ---------------------------------------------------
    // SELECT
    // ---------------------------------------------------

    if (
      this.inputLabelName ===
        'selectGroup' ||

      this.inputLabelName ===
        'selectGroupWithoutTitle'
    ) {

      this.inputValue =
        value ?? null;

      this.updateSelectedItem();
      return;
    }

    this.inputValue = value ?? '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  // =====================================================
  // CALLBACKS
  // =====================================================

  private onChange:(value: any) => void = () => {};


  private onTouched:() => void = () => {};


  // =====================================================
  // FORM CONTROL
  // =====================================================

  get control() {
    return this.ngControl?.control;
  }


  // =====================================================
  // VALIDATION
  // =====================================================

  get showError(): boolean {

    const control = this.control;


    if (!control) {
      return false;
    }

    return (
      control.invalid &&
      (
        control.touched ||
        control.dirty
      )
    );
  }


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  get errorMessage(): string {
     ;
    const errors =
      this.control?.errors;


    if (!errors) {
      return '';
    }

    // Required
    if (errors['required']) {
      return (
        this.requiredMessage ||
        `${this.labelText} is required`
      );
    }


    // Required array
    if (errors['requiredArray']) {

      return (
        this.requiredMessage ||
        `${this.labelText} is required`
      );
    }


    // Min length
    if (errors['minlength']) {

      return (
        `${this.labelText} must be at least ` +
        `${errors['minlength'].requiredLength} ` +
        `characters`
      );
    }


    // Max length
    if (errors['maxlength']) {

      return (
        `${this.labelText} cannot exceed ` +
        `${errors['maxlength'].requiredLength} ` +
        `characters`
      );
    }


    // Min
    if (errors['min']) {

      return (
        `${this.labelText} must be at least ` +
        `${errors['min'].min}`
      );
    }


    // Max
    if (errors['max']) {

      return (
        `${this.labelText} cannot be greater than ` +
        `${errors['max'].max}`
      );
    }


    // Pattern
    if (errors['pattern']) {

      return (
        `${this.labelText} has an invalid format`
      );
    }


    // Default
    return (
      `Please enter a valid ` +
      `${this.labelText.toLowerCase()}`
    );
  }


  // =====================================================
  // NORMAL INPUT
  // =====================================================

  inputChanged(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    let value: any;


    if (
      input.type === 'number'
    ) {

      value =
        input.value === ''
          ? null
          : Number(input.value);

    } else {

      value =
        input.value;
    }


    this.inputValue =
      value;


    this.onChange(
      value
    );
  }


  inputBlur(): void {

    this.onTouched();
  }


  // =====================================================
  // SELECT
  // =====================================================

  toggleDropdown(): void {

    if (this.disabled) {
      return;
    }


    this.toggleList =
      !this.toggleList;
  }


  itemClick(
    item: any
  ): void {

    if (this.disabled) {
      return;
    }


    this.selectValue =
      item;


    this.inputValue =
      item.id;


    this.toggleList =
      false;


    this.onChange(
      item.id
    );


    this.onTouched();
  }


  private updateSelectedItem(): void {

    if (
      this.inputLabelName !==
        'selectGroup' &&

      this.inputLabelName !==
        'selectGroupWithoutTitle'
    ) {

      return;
    }


    this.selectValue =
      this.selectList.find(
        item =>
          item.id ===
          this.inputValue
      ) ?? null;
  }


  // =====================================================
  // TAGS
  // =====================================================

  tagInputChanged(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    this.currentTag =
      input.value;
  }


  addTag(
    event?: Event
  ): void {

    if (this.disabled) {
      return;
    }


    event?.preventDefault();


    const tag =
      this.currentTag.trim();


    if (!tag) {
      return;
    }


    if (
      this.tags.includes(tag)
    ) {

      this.currentTag = '';

      return;
    }


    this.tags = [
      ...this.tags,
      tag
    ];


    this.currentTag = '';


    this.onChange(
      this.tags
    );


    this.onTouched();
  }


  removeTag(
    tag: string
  ): void {

    if (this.disabled) {
      return;
    }


    this.tags =
      this.tags.filter(
        item =>
          item !== tag
      );


    this.onChange(
      this.tags
    );


    this.onTouched();
  }


  removeLastTag(): void {

    if (this.disabled) {
      return;
    }


    if (
      !this.currentTag &&
      this.tags.length > 0
    ) {

      this.tags =
        this.tags.slice(
          0,
          -1
        );


      this.onChange(
        this.tags
      );


      this.onTouched();
    }
  }


  // =====================================================
  // TEXT EDITOR
  // =====================================================

  textEditorChanged(value: string): void {
    this.inputValue = value;
    this.onChange(value);
    this.onTouched();
  }

}
