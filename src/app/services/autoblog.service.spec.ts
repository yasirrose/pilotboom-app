import { TestBed } from '@angular/core/testing';
import { AutoblogService } from './autoblog.service';

describe('AutoblogService', () => {
	let service: AutoblogService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AutoblogService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
