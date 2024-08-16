import {Component, Inject, Input, OnInit} from '@angular/core';
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ClrIconModule, ClrInputModule, ClrTooltipModule} from "@clr/angular";
import {checkIcon, ClarityIcons, pencilIcon, refreshIcon} from "@cds/core/icon";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApplicantsService} from "../services/applicants.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-applicant-details',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    ClrInputModule,
    ClrIconModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    ClrTooltipModule,
  ],
  templateUrl: './applicant-details.component.html',
  styleUrl: './applicant-details.component.css'
})
export class ApplicantDetailsComponent implements OnInit {

  editable: boolean = false;
  form: FormGroup;
  initialValues: { [key: string]: string } = {};

  @Input()
  applicantDetails!: { [key: string]: string | number };

  constructor(@Inject(ApplicantsService)
              private readonly applicantsService: ApplicantsService, @Inject(FormBuilder) private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(pencilIcon);
    ClarityIcons.addIcons(refreshIcon);
    ClarityIcons.addIcons(checkIcon);
    this.initialValues = {};
    console.log(this.applicantDetails);
    Object.entries(this.applicantDetails).forEach(([key, value]: [string, any]) => {
      this.form.addControl(key, new FormControl(value));
      this.initialValues[key] = value;
    });
  }

  isEditable(fieldName: any): boolean {
    const result = this.editable && !['Date_of_Application', 'GovtID_Type', 'ID_Number', 'ID'].includes(fieldName);
    console.log(`${fieldName} is editable? ${result}`)
    return result;
  }

  resetTable(): void {
    this.editable = false;
    this.form.reset(this.initialValues)

  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      this.editable = false
      console.log(this.form.value)
      try {
        await firstValueFrom(this.applicantsService.putApplicants(this.applicantDetails['ID'] as number, this.form.value))
        Object.entries(this.form.value).forEach(([key, value]: [string, any]) => {
          this.form.addControl(key, new FormControl(value));
          this.initialValues[key] = value;
          this.applicantDetails[key] = value
        });
      } catch (e) {
        console.error(e)
      }
    }
  }

  identifyType(key: string): string {
    if (key.includes('Date')) {
      return 'date'
    }
    return 'text'
  }

}
