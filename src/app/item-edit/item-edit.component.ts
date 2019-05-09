import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { IItem } from '../item-list/item';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { NumberValidators } from '../shared/number.validator';
import { debounceTime } from 'rxjs/operators';
import { ItemEditService } from './item-edit.service';
import { ItemService } from '../core/data.service';

@Component({
	selector: 'app-item-edit',
	templateUrl: './item-edit.component.html',
	styleUrls: [ './item-edit.component.css' ]
})
export class ItemEditComponent implements OnInit, AfterViewInit {
	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];
	@ViewChild('AccUserImg') AccUserImage;
	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private itemService: ItemService,
		private itemEditService: ItemEditService
	) {}
	processing: boolean;
	pageTitle = 'Item Edit';
	errorMessage: string;
	item: IItem;
	itemForm: FormGroup;
	displayMessage: { [key: string]: string } = {};
	displayItem(item: IItem): void {
		if (this.itemForm) {
			this.itemForm.reset();
		}
		this.item = item;

		if (this.item._id === 'none') {
			this.pageTitle = 'Add item';
		} else {
			this.pageTitle = `Edit item: ${this.item.ItemName}`;
		}

		this.itemForm.patchValue({
			ItemName: this.item.ItemName,
			id: this.item.id,
			BOX: this.item.BOX,
			Avalible: this.item.Avalible,
			imageURL: this.item.imageURL
		});
	}

	deleteItem(): void {
		if (this.item._id === 'none') {
			this.onSaveComplete();
		} else {
			if (confirm(`Really delete the item: ${this.item.ItemName}?`)) {
				this.processing = true;
				this.itemEditService.deleteitem(this.item._id).subscribe(
					() => this.onSaveComplete(),
					(error: any) => {
						this.errorMessage = <any>error;
						this.processing = false;
					}
				);
			}
		}
	}
	saveItem(): void {
		this.processing = true;

		if (this.itemForm.valid) {
			if (this.itemForm.dirty) {
				const p = { ...this.item, ...this.itemForm.value };

				if (this.item._id === 'none') {
					this.itemEditService.createitem(p).subscribe(
						() => this.onSaveComplete(),
						(error: any) => {
							this.errorMessage = <any>error;
							this.processing = false;
						}
					);
				} else {
					this.itemEditService.updateitem(p).subscribe(
						() => this.onSaveComplete(),
						(error: any) => {
							this.errorMessage = <any>error;
							this.processing = false;
						}
					);
				}
			} else {
				this.onSaveComplete();
				this.processing = false;
			}
		} else {
			this.processing = false;
			this.errorMessage = 'Please correct the validation errors.';
		}
	}
	onFileChange(event) {
		if (event.target.files.length > 0) {
			const Image = this.AccUserImage.nativeElement;
			const newImage: File = Image.files[0];
			this.itemForm.value.imageURL = newImage;
		}
	}
	onSaveComplete(): void {
		this.processing = false;
		this.itemForm.reset();
		this.router.navigate([ '/items' ]);
	}

	ngOnInit(): void {
		this.itemForm = this.fb.group({
			ItemName: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ] ],
			id: [ '', NumberValidators.range(1, 40) ],
			BOX: [ '', NumberValidators.range(0, 20) ],
			Avalible: [ '', [ Validators.required, Validators.maxLength(4) ] ],
			imageURL: [ null ]
		});
		this.route.data.subscribe((data) => {
			this.item = data['item'];
			this.displayItem(this.item);
		});
	}
	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);
		merge(this.itemForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe((value) => {
			this.displayMessage = this.itemEditService.genericValidator.processMessages(this.itemForm);
		});
	}
}
