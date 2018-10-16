import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';



declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;

  public languages: string[] = ['Java', 'Python'];
  language: string = 'Java';

  defaultContent = {
    "Java": ` public class Example {
       public static void main(String[] args) {
        // Type your Java code here
       }
}`,
    "Python": `class Solution:
    def example():
        # Type your Python code here`
  };

  sessionId: string;

  constructor(private collaboration: CollaborationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    })
  }

  initEditor(): void {
  	this.editor = ace.edit("editor");
  	this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.collaboration.init(this.editor, this.sessionId);  	  	

    this.editor.lastAppliedChange = null;

    this.editor.on("change", (e) => {
      console.log('editor changed: ' + JSON.stringify(e));

      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);

    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase()); //default language
  }

  setLanguage(language): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode);

  }

}
