import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators, Editor, Toolbar ,NgxEditorModule} from 'ngx-editor';


@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [ReactiveFormsModule, NgxEditorModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @Input() textEditorContent: string = '';

  @Input() control :FormControl = new FormControl('');

  @Input() disabled?: boolean;
  @Output() valueChange = new EventEmitter<string>();

  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnInit(): void {
    this.control.setValue(this.textEditorContent);
    this.control.valueChanges.subscribe((value) => {
      this.valueChange.emit(value);
    });

    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
