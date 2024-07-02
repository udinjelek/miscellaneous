import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-with-line-numbers',
  standalone: true,
  imports: [],
  templateUrl: './code-with-line-numbers.component.html',
  styleUrl: './code-with-line-numbers.component.scss'
})
export class CodeWithLineNumbersComponent implements OnInit {
  @Input() code: string = '';
  lineNumbers: string = '';
  ngOnInit(): void {
    this.lineNumbers = this.generateLineNumbers(this.code);
  }

  generateLineNumbers(code: string): string {
    const lines = code.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  }
}
