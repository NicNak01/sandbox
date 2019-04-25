// import { ItemListComponent } from './item-list.component';
// import { IItem } from './item';
// import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { ItemService } from './item.service';
// import { of } from 'rxjs';


// describe('item-listComponent', () => {
//   let fixture: ComponentFixture<ItemListComponent>;
//   let FilteredItems: IItem[];
//   let mockitemService;

//   beforeEach(() => {
//     FilteredItems = [
//       {ItemName: 'ItemOne',
//       id: 1,
//       BOX: 1,
//       Avalible: 'yes',
//       imageURL: 'qwerrty',
//       _id: '1qwerrty'},
//       {ItemName: 'Itemtwo',
//       id: 2,
//       BOX: 2,
//       Avalible: 'yes',
//       imageURL: 'qwerrty',
//       _id: '2qwerrty'}
//     ];
//     TestBed.configureTestingModule({
//       declarations: [
//         ItemListComponent
//       ],
//       providers: [
//         { provide: ItemService , useValue: mockitemService }
//       ]
//       // schemas: [NO_ERRORS_SCHEMA]
//     });
//     mockitemService = jasmine.createSpyObj(['getItem', 'getItems']);
//     fixture = TestBed.createComponent(ItemListComponent);
//   });
//   it('should call all items', () => {
//     mockitemService.getHeroes.and.returnValue(of(FilteredItems));
//     fixture.detectChanges();

//     expect(fixture.componentInstance.filteredItems.length).toBe(2);
//   });



//   // describe('should call all items', () => {

//   //   it('should displai all items', () => {
//   //     mockHeroService.deleteHero.and.returnValue(of(true))
//   //     component.heroes = HEROES;

//   //     component.delete(HEROES[2]);

//   //     expect(component.heroes.length).toBe(2);
//   //   })

//   //   it('should call deleteHero', () => {
//   //     mockHeroService.deleteHero.and.returnValue(of(true))
//   //     component.heroes = HEROES;

//   //     component.delete(HEROES[2]);

//   //     expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
//   //   })
//   // })
// });
