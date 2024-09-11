import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-with-line-numbers',
  standalone: true,
  templateUrl: './code-with-line-numbers.component.html',
  styleUrls: ['./code-with-line-numbers.component.scss']
})
export class CodeWithLineNumbersComponent implements OnInit {
  @Input() code: string = '';
  @Input() wordColorMapping: { [color: string]: string[] } = {};
  
  // sample use
  // wordColorMapping = {
  //   red: ['important', 'urgent'],
  //   blue: ['select', 'info']
  // }

  lineNumbers: string = '';
  highlightedCode: string = '';

  ngOnInit(): void {
    this.lineNumbers = this.generateLineNumbers(this.code);
    this.highlightedCode = this.highlightText(this.code);
  }

  generateLineNumbers(code: string): string {
    const lines = code.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  }

  highlightText(text: string): string {
    const regexParts = Object.entries(this.wordColorMapping)
      .map(([color, words]) => `(${words.join('|')})`)
      .join('|');
    
    const regex = new RegExp(`\\b(${regexParts})\\b`, 'gi');
    
    return text.replace(regex, (match) => {
      const color = Object.keys(this.wordColorMapping).find(color => 
        this.wordColorMapping[color].includes(match.toLowerCase())
      );
      return `<span class="${color}">${match}</span>`;
    });
  }
}
