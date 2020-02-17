import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let validateService: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    validateService = TestBed.get(ValidationService);
  });

  it('should be created', () => {
    expect(validateService).toBeTruthy();
  });

  it('should return true for a valid number of seats', () => {
    expect(validateService.validateSeats(2)).toBe(true);
  });

  it('should return true for a valid username', () => {
    expect(validateService.validateUserName("testuser")).toBe(true);
  });

  it('should return true for a valid name', () => {
    expect(validateService.validateName("testname")).toBe(true);
  });
  
  it('should return true for a valid email', () => {
    expect(validateService.validateEmail("testemail@gmail.com")).toBe(true);
  });

  it('should return true for a valid phone', () => {
    expect(validateService.validatePhone("(123)456-7980")).toBe(true);
  });

  it('should test if name is formatted properly', () => {
    expect(validateService.nameFormat("cOdY")).toMatch("Cody");
  });

  // it('should test if phone number is formatted properly', () => {
  //   console.log(validateService.phoneFormat("1234567890"));
  //   expect(validateService.phoneFormat("12345678o90")).toMatch("(123) 456-7890");
  // });
});
